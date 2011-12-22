(function () {
  var base = require('./base');

  function Collection(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(db_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections', 'GET', query, function(data){
      var collections = [];
      for( var i=0; i < data.length; ++i ) {
        collections.push( new Collection( data[i] ) );
      }
      callback( collections );
    });
  }

  exports.find = function(db_name, col_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name, 'GET', query, function(data){
      callback( new Collection( data ) );
    });
  }

  exports.create = function(db_name, params, callback) {
    base.connection().call('/databases/' + db_name + '/collections', 'POST', params, function(data){
      callback( new Collection( data ) );
    });
  }

  exports.update = function(db_name, col_name, params, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name, 'PUT', params, function(data){
      callback( new Collection( data ) );
    });
  }

  exports.delete = function(db_name, col_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name, 'DELETE', query, function(data){
      callback( data );
    });
  }

})();
