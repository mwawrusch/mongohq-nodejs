(function () {
  var connection = require("./mongohq/connection");

  exports.authenticate = function(options) {
    connection.options = options || { };
    // connection.apikey = options['apikey'];
    return this;
  }

  exports.database = require('./mongohq/database');
  exports.collection = require('./mongohq/collection');
  exports.document = require('./mongohq/document');
  exports.plan = require('./mongohq/plan');

})();
