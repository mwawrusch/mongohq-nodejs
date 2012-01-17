(function () {
  var base = require('./base');

  function Invoice(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(options) {
    var options = options || {};
    var callback = options['success'] || function(d){};
    options['success'] = function(data) {
      var invoices = [];
      for( var i=0; i < data.length; ++i ) {
        invoices.push( new Invoice( data[i] ) );
      }
      callback( invoices );
    }
    base.connection().call('/invoices', 'GET', options);
  }

  exports.find = function(options) {
    var options = options || {};
    var inv_name = options['inv_name'];
    var callback = options['success'] || function(d){};
    options['success'] = function(data){
      callback( new Invoice( data ) );
    }
    base.connection().call('/invoices/' + inv_name, 'GET', options);
  }

})();
