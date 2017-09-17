var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public/'));

// setup a 'route' to listen on the default url path
//app.get("/", (req, res) => {
  //  res.send(");
//});
console.log("Express http server listening on "+HTTP_PORT);
app.get("/",function(request,respond){
    respond.sendFile(__dirname + "/views/home.html");


});
//app.get("/about",function(request,respond){
   // respond.sendFile(path.join(__dirname));
//});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);


/*

var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
*/

