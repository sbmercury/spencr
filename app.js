'use strict';

var express = require('express');
var app = express();
app.use(express.static('public'));

var mongo = require('mongodb');
var mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

var bodyParser = require('body-parser');

var cors = require('cors');

var helmet = require('helmet');
app.use(helmet());

mongoose.connect(process.env.DATABASE, {useUnifiedTopology: true, useNewUrlParser: true});

var Schema = mongoose.Schema;

var urlSchema = new Schema({
  url: String,
  code: String
});

var URL = mongoose.model('URL', urlSchema);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


// your first API endpoint...
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


app.post("/api", function(req, res) {
  URL.updateOne({code: req.body.code }, { url: req.body.url, code: req.body.code}, { upsert : true }, function(err, data) {
    if(err) return console.error(err);
    console.log(data);
    res.redirect("/");
  })
});



// listen for requests :)
const listener = app.listen(process.env.PORT || 8070, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = listener;
