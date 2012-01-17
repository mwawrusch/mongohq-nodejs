(function () {
  var base = require('./base');

  function Index(values) {
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
        documents.push( new Index( data[i] ) );
      }
      callback( documents );
    }
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes', 'GET', options);
  }

  exports.create = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes', 'POST', options);
  }

  exports.delete = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    var ind_name = options['ind_name'];
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes/' + ind_name, 'DELETE', options);
  }

  exports.delete_all = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    base.connection().call('/databases/' + db_name + '/collections/' + col_name + '/indexes', 'DELETE', options);
  }

})();
