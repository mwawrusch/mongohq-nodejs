var vows      = require('vows'),
    assert    = require('assert'),
    vanguard  = require('../lib/vanguard');

vows.describe('Vanguard').addBatch({
  'exports model can access': {
    topic: function () {
      return vanguard.authenticate({'apikey' : 'derp'});
    },
    
    'databases': function (topic) {
      assert.isNotNull(topic.databases);
    },

    'plans': function (topic) {
      assert.isNotNull(topic.plans);
    },
  }
}).export(module);
