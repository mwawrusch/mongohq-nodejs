(function () {
  var base = require('./base');

  function Database(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(query, callback) {
    // use the connect string to make a 'GET' call, pass in the callback
    base.connection().call('/databases', 'GET', query, function(data){
      var databases = [];
      for( var i=0; i < data.length; ++i ) {
        databases.push( new Database( data[i] ) );
      }
      callback( databases );
    });
  }

  // TODO: find, create, delete...
})();
