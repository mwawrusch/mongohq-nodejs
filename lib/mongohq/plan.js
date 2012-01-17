(function () {
  var base = require('./base');

  function Plan(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(options) {
    var options = options || {};
    var callback = options['success'] || function(d){};
    options['success'] = function(data) {
      var plans = [];
      for( var i=0; i < data.length; ++i ) {
        plans.push( new Plan( data[i] ) );
      }
      callback( plans );
    }
    base.connection().call('/plans', 'GET', options);
  }
})();
