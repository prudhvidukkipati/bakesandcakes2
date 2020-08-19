var PORT = process.env.PORT || 3000;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path =require('path');
var session = require('express-session');
app.use(express.static(__dirname + "/public"));
var http = require('http');
var server = http.Server(app);




var handlebars = require('express-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());




app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});










// set routes

var pages =require('./routes/pages.js');
app.use('/',pages);
app.use('/bakery',pages);
app.use('/cart',pages);



server.listen(PORT, function() {
    
    console.log('server running');
});