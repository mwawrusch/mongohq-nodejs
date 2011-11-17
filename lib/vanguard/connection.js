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

    // parse URL
    // url

    this.host = this.options['host'] || 'localhost'; // 'api.mongohq.com'
    this.port = this.options['port'] || 3000;

    // if starts with https, this is secure
    this.secure = false; // this.base_url.indexOf('https') == 0;

    this.conn = this.secure ? https : http;
  };


  Connection.prototype.call = function(path, method, query, callback)
  {
    query = query || { };
    method = method || 'GET';

    var body = qs.stringify(query);
    var headers = {
      "Host": this.host,
      "User-Agent": "Sputnik/0.1/js"
    };

    var options = {
      host: this.host,
      port: this.port,
      path: path + '?_apikey=' + this.apikey,
      method: method,
      headers: headers,
    };

    var req = this.conn.request(options, function(res) {
      var data = '';
      //the listener that handles the response chunks
      res.addListener('data', function(chunk) {
        data += chunk.toString();
      });
      res.addListener('end', function() {
        callback( JSON.parse( data ) );
      });
    });
    req.end( JSON.stringify(body) );
  };

  exports.Connection = Connection;

})();
