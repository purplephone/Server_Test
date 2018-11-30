var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var session = require('express-session');
var mongo = require('mongoose');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));



var db = mongo.connection;
db.on('error',console.error);
db.once('open',function(){
  console.log("MongoDB gogo");
});
mongo.connect('mongodb://localhost/cschedule');



var port = process.env.PORT || 80;
var router = require('./router/MainControl')(app);
var server = app.listen(port, function(){
  console.log("gogo server " + port);
});


//test2233







//test real zxcs
