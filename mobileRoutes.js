/**
 * Created by gabriella.querales on 12/30/15.
 */

var bodyParser = require('body-parser');
var redis = require('redis');
var clientR = redis.createClient("6379", "localhost");
var request = require("request")
var http = require('http');


clientR.on("error", function (err) {
    console.log("Error " + err);
});

clientR.on('connect', function() {
    console.log('connected');
});

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/userMobile'
mongoose.connect(url).connection;

var Schema = mongoose.Schema; // <-- EDIT: missing in the original post
var User = new Schema({
    first_name:String,
    last_name:String,
    email:String,
    picture:String,
    pref_movie:String,
    address :{
        street: String,
        city: String,
        state: String
    }
})

mongoose.model('Users', User)
var Users = mongoose.model('Users', User);

module.exports = function(app) {
    // this hook is to test the event loop snapshot. It takes 5 seconds to execute (slow process)
    app.get('/recommendations', function (request, response) {
        process.nextTick(function () {
            userPref(
                function() { 
                    console.log('executing CB()');
                    httpCall (function() {
                        console.log('rec done');
                        response.send('done recommendations!!');
                    });
                }
            );
        });
    });

    app.get('/userExperience', function (req, response) {
        var userName = req.query.first_name;
        if (!userName) userName = {'first_name': 'Andrew'};

        Users.find(userName,function (err, person) {
            if (err) return handleError(err);
            console.log('Found this person: --> (1 beta) ');
            httpCall(function () {
                //call redis endpoint
                funcRedis( function (){ console.log("this should be the last call, closing bt here.... (4)")
                    response.send('done userExp yay!!')});

            });
        });
    });
}


//**********************************
// Internal functions go here     //
//**********************************

// this function takes 5 seconds.
function userPref(CB) {
    var functions = require('./preferences.js');
    functions.favActors("Ryan Gosling");
    CB();

}

function funcRedis (CB) {
    console.log("redis.......... 3")
    clientR.set('framework', 'AngularJS', function(err, reply) {
        console.log('RedDis client set 3.1');
        CB()
    });
}

// Web Service calling function -
function httpCall(BT) {
    console.log('httpCall');
    request('http://google.com', function() { 
        console.log(" should be last...."); 
        BT();
    });
}

function sleep(time, callback) {
    dummy = [];
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        dummy.push(0);
        if (dummy.length > 100) {
            dummy.splice(0, 10);

        }
    }
    callback();
}

