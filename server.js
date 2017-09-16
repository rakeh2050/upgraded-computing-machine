var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
app.use(express.static('public')); 
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Express http server listening on "+HTTP_PORT+__dirname);
});
app.get("/",function(request,respond){
    console.log(__dirname);
    respond.sendFile(path.join(__dirname+"/views/home.html"));
});
app.get("/about",function(request,respond){
    respond.sendFile(path.join(__dirname+"/views/home.html"));
});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);
