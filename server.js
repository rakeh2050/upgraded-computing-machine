var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public')); 
// viewed at http://localhost:8080
app.get("/", (req, res) => {
    res.send("Express http server listening on "+HTTP_PORT+"  "+__dirname);
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
