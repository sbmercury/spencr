'use strict';

//Set up a webserver usig express
var express = require('express');
var app = express();
app.use(express.static('public')); //loads static content (css files) from public folder

//Load mongoose and mongodb
var mongo = require('mongodb');
var mongoose = require('mongoose');

//Load dotenv, used to load environment variables
const dotenv = require('dotenv');
dotenv.config();

//Load bodyparser, used to parse request bodies
var bodyParser = require('body-parser');

var cors = require('cors');

//Load helmet which automatically handles some security stuff for us
var helmet = require('helmet');
app.use(helmet());

//Connect to our database using a URI from an environment variable
mongoose.connect(process.env.DATABASE, {useUnifiedTopology: true, useNewUrlParser: true});

//Create the schema and model used to store info about a shortcode
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: String,
  code: String
});

var URL = mongoose.model('URL', urlSchema);

app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));

//Endpoint for serving the site's homepage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//This is the main endpoint for handling spencr.me/<shortcode>
//we use a parameter in the URL which is parsed then handed to
//mongoose which gets the associated full URL and redirects us to it
app.get("/:id", function(req, res) {
     var id = req.params.id;
     var person = URL.findOne({code: id}, function(err, data) {
         if(err) return console.error(err);
         if(data == null) {
           res.status(404);
           res.send("404");
         }
         else {
           res.redirect(data.url);
         }
       })
    });


//Endpoint for requesting or creating a shortcode
//uses mongooses's updateOne function with upsert on
//to allow us to easily update or add in one endpoint
app.post("/api", function(req, res) {
  URL.updateOne({code: req.body.code }, { url: req.body.url, code: req.body.code}, { upsert : true }, function(err, data) {
    if(err) return console.error(err);
    console.log(data);
    res.redirect("/");
  })
});



//Listen for requests on the specified port or a default of 8070
const listener = app.listen(process.env.PORT || 8070, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = listener;
