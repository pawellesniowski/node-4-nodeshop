const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const config = require('./config/database.js');
const { dbpath } = config;

console.log(dbpath);

// mongoose connection to DB:
mongoose.connect("mongodb://localhost/nodeshop");
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

// get request:
app.get('/', function(req, res){
    res.render('index', {
        title: "Homepage"
    });
})

// Start the server:
const port = 3000;
app.listen(port, function (){
    console.log("Server started and listening on port: ", port);
})