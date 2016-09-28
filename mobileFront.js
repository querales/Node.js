/**
 * Created by gabriella.querales on 12/30/15.
 */

require("appdynamics").profile({
    controllerHostName:'dev.demo.appdynamics.com',
    controllerPort:'80',
  //  accountName:'customer1_f16aea9b-844d-476d-92db-60f3acaa620d',
    accountName:'customer1',
    accountAccessKey:'',
    applicationName: 'Movie Tickets Online_GQ',
    tierName: 'mobileUI_GQ',
    nodeName: 'mobileFront'
    //debug:true
});

//open source modules
var express = require('express'),
    app = express();

//configure app routes
var route = require ('./mobileRoutes') (app);

// Make our Express server listen on port 3000.
app.listen(3000);
