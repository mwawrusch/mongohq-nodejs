(function () {
  var connection = require("./mongohq/connection");

  exports.authenticate = function(options) {
    connection.options = options || { };
    return this;
  }

  exports.databases = require('./mongohq/database');
  exports.collections = require('./mongohq/collection');
  exports.documents = require('./mongohq/document');
  exports.indexes = require('./mongohq/index');
  exports.plans = require('./mongohq/plan');
  exports.invoices = require('./mongohq/invoice');

})();
