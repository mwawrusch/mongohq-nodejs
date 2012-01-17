(function () {
  var url    = require("url");
  var http   = require("http");
  var https  = require("https");
  var qs     = require("querystring");

  function Connection(options)
  {
    this.options = options || { };

    this.apikey = this.options['apikey'];

    if(this.apikey == null) {
      throw("apikey must be set")
    }

    this.base_url = this.options['url'] || 'https://api.mongohq.com'

    // parse URL
    var urlObj = url.parse(this.base_url) || {}

    this.host = urlObj['host'] || this.options['host'] || 'api.mongohq.com'
    this.port = urlObj['port'] || this.options['port'] || 443;
    var protocol = urlObj['protocol'] || 'https:';

    // if starts with http:, this is not secure
    this.secure = protocol.indexOf('http:') != 0;

    this.conn = !this.secure ? http : https;
  };


  Connection.prototype.call = function(path, method, options)
  {
    options = options || {};
    var data = options['data'] || options['params'] || options['query'] || {};
    var success = options['success'] || function(data) { return data; };
    var error = options['error'] || function(data) { return data; };

    method = method || 'GET';

    var headers = {
      "Host": this.host,
      "User-Agent": "Sputnik/0.3/js",
      "Content-Type": "application/json",
      "MongoHQ-API-Token": this.apikey
    };

    data['_apikey'] = this.apikey

    var body = qs.stringify(data);

    var requestOpts = {
      host: this.host,
      port: this.port,
      path: path,
      method: method,
      headers: headers
    };

    var req = this.conn.request(requestOpts, function(res) {
      var data = '';
      //the listener that handles the response chunks
      res.addListener('data', function(chunk) {
        data += chunk.toString();
      });
      res.addListener('end', function() {
        success( JSON.parse( data ) );
      });
      res.addListener('error', function(err) {
        error( err, data );
      });
    });
    // req.end( JSON.stringify(body) );
    req.end( body );

    return this;
  };

  exports.Connection = Connection;

})();
