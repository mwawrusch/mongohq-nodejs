(function () {
  var base = require('./base');

  function Index(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(db_name, col_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes', 'GET', query, function(data){
      var documents = [];
      for( var i=0; i < data.length; ++i ) {
        documents.push( new Index( data[i] ) );
      }
      callback( documents );
    });
  }

  exports.find = function(db_name, col_name, ind_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes/' + ind_name, 'GET', query, function(data){
      callback( new Index( data ) );
    });
  }

  exports.create = function(db_name, col_name, params, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes', 'POST', params, function(data){
      callback( new Index( data ) );
    });
  }

  exports.update = function(db_name, col_name, ind_name, params, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes/' + ind_name, 'PUT', params, function(data){
      callback( new Index( data ) );
    });
  }

  exports.delete = function(db_name, col_name, ind_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes/' + ind_name, 'DELETE', query, function(data){
      callback( data );
    });
  }

})();
