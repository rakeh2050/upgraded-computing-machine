/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this 
assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: JATIN ARORA__  Student ID:136897162_ Date: 17 September , 2017_
*
*  Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public/'));

// setup a 'route' to listen on the default url path

console.log("Express http server listening on "+HTTP_PORT);
app.get("/",function(request,respond){
    respond.sendFile(__dirname + "/views/home.html");


});
app.get("/about",function(request,respond){
    respond.sendFile(__dirname + "/views/about.html");


});

app.listen(HTTP_PORT);

