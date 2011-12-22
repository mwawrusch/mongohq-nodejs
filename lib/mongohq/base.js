(function () {
  var connection = require('./connection');

  exports.connection = function() {
    if( typeof(this.conn) === 'undefined' ) {
      this.conn = new connection.Connection(connection.options);
    }
    return this.conn;
  }

  exports.populateModel = function(obj, values) {
    obj.length = 0;
    for(key in values) {
      var val = values[key];
      if( typeof(val) !== 'undefined' ) {
        obj[key] = val;
        obj.length++;
      }
    }
  };

})();
