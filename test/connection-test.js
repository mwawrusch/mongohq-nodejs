var vows      = require('vows'),
    assert    = require('assert'),
    mongohq  = require('../lib/mongohq'),
    base      = require('../lib/mongohq/base'),
    connection = require('../lib/mongohq/connection');

vows.describe('Connections').addBatch({
  'when not authenticated': {
    topic: base,
    'cannot create a connection': {
      'is not null': function (topic) {
        assert.throws( function() {topic.connection()}, 'apikey must be set' )
      },
    }
  }

}).addBatch({
  'when authenticating': {
    topic: function () {
      return mongohq.authenticate({'apikey' : 'derp'});
    },

    'return the mongohq plugin': {
      'is not null': function (topic) {
        assert.isNotNull(topic);
      },
      'is able to re-authenticate': function (topic) {
        assert.isNotNull(topic.authenticate);
      }
    }
  }
}).addBatch({

  'when making a call': {
    topic: function () {
      mongohq.authenticate({'apikey' : 'derp'});
      mongohq.conn = {'request' : function(){console.log('called')}}
      return base.connection();
    },

    'accepts only path': function (topic) {
      assert.doesNotThrow( function() {topic.call('/')}, Error )
    },

    'accepts only path and method': function (topic) {
      assert.doesNotThrow( function() {topic.call('/', 'GET')}, Error )
    },

    'accepts only path, method, and query': function (topic) {
      assert.doesNotThrow( function() {topic.call('/', 'GET', {'herp' : 'derp'})}, Error )
    }
  },

  'when making a callback': {
    topic: function () {
      mongohq.authenticate({'apikey' : 'derp'});
      mongohq.conn = {'request' : function(opts, callback){ assert(false); }}
      return base.connection();
    },

    'accepts callback': function (topic) {
      topic.call('/', 'GET', {}, function(){
        assert(true)
      })
    }
  }
}).export(module);

