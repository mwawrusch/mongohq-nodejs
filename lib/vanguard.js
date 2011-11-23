(function () {
  var connection = require("./vanguard/connection");

  exports.authenticate = function(options) {
  	connection.options = options || { };
    // connection.apikey = options['apikey'];
    return this;
  }

  exports.database = require('./vanguard/database');
  exports.plan = require('./vanguard/plan');

})();
