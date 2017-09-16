var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
app.use(express.static('public')); 
var __dirname="C:/Users/Jatin/Documents/WEB 322/web322-app/views/home.html";
// setup a 'route' to listen on the default url path
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise (function(res,req){
    data_service.initialize().then(function(data){
      console.log(data)
    }).catch(function(err){
      console.log(err);
    });
});
}
app.get("/",function(request,respond){
    
    respond.sendFile(path.join(__dirname));
});
app.get("/about",function(request,respond){
    respond.sendFile(path.join(__dirname+"/views/home.html"));
});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);
