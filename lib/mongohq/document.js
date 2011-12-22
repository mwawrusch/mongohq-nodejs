(function () {
  var base = require('./base');

  function Document(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(db_name, col_name, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents', 'GET', query, function(data){
      var documents = [];
      for( var i=0; i < data.length; ++i ) {
        documents.push( new Document( data[i] ) );
      }
      callback( documents );
    });
  }

  exports.find = function(db_name, col_name, doc_id, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents/' + doc_id, 'GET', query, function(data){
      callback( new Document( data ) );
    });
  }

  exports.create = function(db_name, col_name, params, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents', 'POST', params, function(data){
      callback( new Document( data ) );
    });
  }

  exports.update = function(db_name, col_name, doc_id, params, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents/' + doc_id, 'PUT', params, function(data){
      callback( new Document( data ) );
    });
  }

  exports.delete = function(db_name, col_name, doc_id, query, callback) {
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents/' + doc_id, 'DELETE', query, function(data){
      callback( data );
    });
  }

})();
