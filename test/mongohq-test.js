var vows      = require('vows'),
    assert    = require('assert'),
    mongohq  = require('../lib/mongohq');

vows.describe('MongoHQ').addBatch({
  'exports model can access': {
    topic: function () {
      return mongohq.authenticate({'apikey' : 'derp'});
    },
    
    'databases': function (topic) {
      assert.isNotNull(topic.databases);
    },

    'plans': function (topic) {
      assert.isNotNull(topic.plans);
    },
  }
}).export(module);
