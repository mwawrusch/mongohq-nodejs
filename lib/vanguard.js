(function () {
  var connection = require("./vanguard/connection");

  exports.authenticate = function(options) {
  	connection.options = options || { };
    // connection.apikey = options['apikey'];
  }

  exports.database = require('./vanguard/database');

})();
