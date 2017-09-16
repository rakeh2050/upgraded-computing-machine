var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
app.use(express.static('public')); 

// setup a 'route' to listen on the default url path
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT+"  "+__dirname);
    return new Promise (function(res,req){
    data_service.initialize().then(function(data){
      console.log(data)
    }).catch(function(err){
      console.log(err);
    });
});
}
app.get("/",function(request,respond){
    
    respond.sendFile(path.join(__dirname, '../public', 'home.html'));
});
//app.get("/about",function(request,respond){
   // respond.sendFile(path.join(__dirname));
//});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);
