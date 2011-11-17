(function () {
  var connection = require("./vanguard/connection");

  exports.authenticate = function(apikey) {
    connection.apikey = apikey;
  }

  exports.database = require('./vanguard/database');

})();


// var v = require('./lib/vanguard.js');
// v.authenticate('derp')
// v.database.all({}, function(dbs) {
//  console.logs(dbs);
// });
