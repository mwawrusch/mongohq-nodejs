var vows      = require('vows'),
    assert    = require('assert'),
    vanguard  = require('../lib/vanguard');

vows.describe('Connections').addBatch({
  'when authenticating': {
    topic: function () {
      return vanguard.authenticate({'apikey' : 'derp'});
    },

    'return the vanguard plugin': {
      'is not null': function (topic) {
        assert.isNotNull(topic);
      },
      'is able to re-authenticate': function (topic) {
        assert.isNotNull(topic.authenticate);
      }
    }
  }

  // TODO: connection can call "call"
}).export(module);
