var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
app.use(express.static('public')); 
var __dirname="C:/Users/Jatin/Documents/WEB 322/web322-app/views/home.html";
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Express http server listening on "+HTTP_PORT+__dirname);
});
app.get("/",function(request,respond){
    
    respond.sendFile(path.join(__dirname));
});
app.get("/about",function(request,respond){
    respond.sendFile(path.join(__dirname+"/views/home.html"));
});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);
