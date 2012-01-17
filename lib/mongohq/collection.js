(function () {
  var base = require('./base');

  function Collection(values) {
    base.populateModel( this, values );
  }

  exports.all = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data) {
      var collections = [];
      for( var i=0; i < data.length; ++i ) {
        collections.push( new Collection( data[i] ) );
      }
      callback( collections );
    }
    base.connection().call('/databases/' + db_name + '/collections', 'GET', options);
  }

  exports.find = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data){
      callback( new Collection( data ) );
    }
    base.connection().call('/databases/' + db_name + '/collections/' + col_name, 'GET', options);
  }

  exports.create = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    base.connection().call('/databases/' + db_name + '/collections', 'POST', options);
  }

  exports.update = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    base.connection().call('/databases/' + db_name + '/collections/' + col_name, 'PUT', options);
  }

  exports.delete = function(options) {
    var options = options || {};
    var db_name = options['db_name'];
    var col_name = options['col_name'];
    base.connection().call('/databases/' + db_name + '/collections/' + col_name, 'DELETE', options);
  }

})();
