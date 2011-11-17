# Vanguard-1

![Vanguard](http://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Vanguard_1.jpg/250px-Vanguard_1.jpg)

## Using

    // Must first authenticate using your account's API key
    var v = require('vanguard')
    v.authenticate(:apikey => 'derp')

	// Get all databases
    v.database.all({}, function( databases ){
      // do something asynchronous with databases array
    })
