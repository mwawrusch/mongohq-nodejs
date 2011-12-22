(function () {
  var base = require('./base');

  function Plan(values) {
    base.populateModel( this, values );
  }
  
  exports.all = function(query, callback) {
    base.connection().call('/plans', 'GET', query, function(data){
      var plans = [];
      for( var i=0; i < data.length; ++i ) {
        plans.push( new Plan( data[i] ) );
      }
      callback( plans );
    });
  }
})();
