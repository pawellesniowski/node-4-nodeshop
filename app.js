const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const config = require('./config/database.js');
const { dbpath } = config;
const bodyParser = require('body-parser');
const session = require('express-session');
const validator = require("express-validator");
const expressMessages = require('express-messages');
const flash = require("connect-flash");


// mongoose connection to DB:
mongoose.connect(dbpath);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("we are connected!");
});

//  init app:
const app = express();

// set views folder and engine: 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use public folder
app.use(express.static(path.join(__dirname, 'public')));

//global variable seen through the application:
app.locals.errors = null;

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Validator
app.use(validator());

// express-messages middleware:
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express session middleware: 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}))

// seting routes: 
const admin_pages = require('./routes/admin_pages.js');
const admin_categories = require('./routes/admin_categories.js');
const shop_pages = require('./routes/shop_pages.js');
app.use('/admin/pages', admin_pages);     // changed form app.get to app.use !
app.use('/admin/categories', admin_categories); // added for categories
app.use('/', shop_pages);           // changed form app.get to app.use !

// Start the server:
const port = 3000;
app.listen(port, function (){
    console.log("Server started and listening on port: ", port);
});