const express = require('express');
const path = require("path");

//  init app:
const app = express();

// set views folder and engine: 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use public folder
app.use(express.static(path.join(__dirname, 'public')));

// get request:
app.get('/', function(req, res){
    res.send("Hello world");
})

// Start the server:
const port = 3000;
app.listen(port, function (){
    console.log("Server started and listening on port: ", port);
})