(function () {
  var base = require('./base');

  function Document(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data) {
      var documents = [];
      for( var i=0; i < data.length; ++i ) {
        documents.push( new Document( data[i] ) );
      }
      callback( documents );
    }
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents', 'GET', options);
  }

  exports.find = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    var doc_id = options['doc_id'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data) {
      callback( new Document( data ) );
    }
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents/' + doc_id, 'GET', options);
  }

  exports.create = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents', 'POST', options);
  }

  exports.update = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    var doc_id = options['doc_id'];
    if(doc_id && doc_id !== '') {
      base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents/' + doc_id, 'PUT', options);
    } else {
      base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents', 'PUT', options);
    }
  }

  exports.delete = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    var doc_id = options['doc_id'];
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/documents/' + doc_id, 'DELETE', options);
  }

})();
