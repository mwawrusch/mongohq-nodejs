# MongoHQ API NodeJS

![Vanguard](http://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Vanguard_1.jpg/250px-Vanguard_1.jpg)

This is a NodeJS interface to the MongoHQ API. Sure, you can communicate with your MongoDB
instance, but just as importantly, you can communicate with the MonogoHQ system. For example,
getting plans or account invoices. Soon, everything you can do via the MongoHQ web interface,
you should be able to do with the API.

This is very much beta. Keep that in mind.

## Using

You can get the most recent stable version through NPM

    npm install mongohq

To use, just require it, and do stuff.

    // Must first authenticate using your account's API key
    var mhq = require('mongohq').authenticate({apikey : 'derp'});

    // Get all account invoices
    mhq.invoices.all({
      success : function( databases ) {
        // do something asynchronous with Invoice array
      }
    });
    
    // Get all databases
    mhq.databases.all({
      success : function( databases ) {
        // do something asynchronous with Database array
      }
    });
    
    // Get one database
    mhq.databases.find({
      db_name : 'my_db_name',
      success : function( database ) {
        // do something asynchronous with Database object
      }
    });

    // Get one database
    mhq.documents.find({
      db_name : 'my_db_name',
      col_name: 'my_col_name',
      doc_id  : '12345',
      success : function( document ) {
        // do something asynchronous with Document object
      }
    });
