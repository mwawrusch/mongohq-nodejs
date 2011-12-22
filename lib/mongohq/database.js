(function () {
  var base = require('./base');

  function Database(values) {
    base.populateModel( this, values );
  }

  function DatabaseStats(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(query, callback) {
    base.connection().call('/databases', 'GET', query, function(data){
      var databases = [];
      for( var i=0; i < data.length; ++i ) {
        databases.push( new Database( data[i] ) );
      }
      callback( databases );
    });
  }

  exports.find = function(db_name, query, callback) {
    base.connection().call('/databases/' + db_name, 'GET', query, function(data){
      callback( new Database( data ) );
    });
  }

  exports.create = function(params, callback) {
    base.connection().call('/databases', 'POST', params, function(data){
      callback( new Database( data ) );
    });
  }

  exports.delete = function(db_name, query, callback) {
    base.connection().call('/databases/' + db_name, 'DELETE', query, function(data){
      callback( data );
    });
  }

  // yuck. I don't like this much...
  exports.stats = function(db_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/stats', 'GET', query, function(data){
      callback( new DatabaseStats( data ) );
    });
  }

})();
