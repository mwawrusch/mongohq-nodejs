# MongoHQ API NodeJS

![Vanguard](http://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Vanguard_1.jpg/250px-Vanguard_1.jpg)

## Using

You can get the most recent stable version through NPM

    npm install mongohq

To use, just require it, and do stuff.

    // Must first authenticate using your account's API key
    var mhq = require('mongohq').authenticate({apikey : 'derp'});

	// Get all databases
    mhq.database.all({}, function( databases ) {
      // do something asynchronous with databases array
    });
