(function () {
  var base = require('./base');

  function Database(values) {
    base.populateModel( this, values );
  }

  function DatabaseOps(values) {
    base.populateModel( this, values );
  }

  function SlowQueries(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(options) {
    var options = options || {};
    var callback = options['success'] || function(d){};
    options['success'] = function(data) {
      var databases = [];
      for( var i=0; i < data.length; ++i ) {
        databases.push( new Database( data[i] ) );
      }
      callback( databases );
    }
    base.connection().call('/databases', 'GET', options);
  }

  exports.find = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data){
      callback( new Database( data ) );
    }
    base.connection().call('/databases/' + db_name, 'GET', options);
  }

  exports.create = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    base.connection().call('/databases', 'POST', options);
  }

  exports.delete = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    base.connection().call('/databases', 'DELETE', options);
  }

  exports.ops = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data){
      callback( new DatabaseOps( data ) );
    }
    base.connection().call('/databases/' + db_name + '/ops', 'GET', options);
  }

  exports.slow_queries = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var doc_id = options['doc_id'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data){
      var slow_queries = [];
      for( var i=0; i < data.length; ++i ) {
        slow_queries.push( new SlowQueries( data[i] ) );
      }
      callback( slow_queries );
    }
    if(doc_id && doc_id !== '') {
      base.connection().call('/slow_queries/' + db_name + '/' + doc_id, 'GET', options);
    } else {
      base.connection().call('/slow_queries/' + db_name, 'GET', options);
    }
  }

})();
