/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this 
assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: JATIN ARORA__  Student ID:136897162_ Date: 2nd October , 2017_
*
*  Online (Heroku) Link: https://as2-jarora4.herokuapp.com/
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 2020;
var express = require("express");
var app = express();
//var file=require("./data-server.js")
var db = require("./data-service.js");
app.use(express.static(__dirname + '/public/'));
var path = require("path");



app.get("/", function(request,response){
   //response.send("Hello World<br /><a href='/about'>Go to the about page</a>");
   response.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(request,response){
  response.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", function(request,response){
  
  if(request.query.status){
    db.getEmployeesByStatus(request.query.status).then(function(data){
      response.json(data);
    }).catch(function(err){
      response.json({message: err});
    });
  }
  
      else if(request.query.department){
        db.getEmployeesByDepartment(request.query.department).then(function(data){
          response.json(data);
        }).catch(function(err){
          response.json({message: err});
        });
      }else if(request.query.manager){
        db.getEmployeesByManager(request.query.manager).then(function(data){
          response.json(data);
        }).catch(function(err){
          response.json({message: err});
        });
      }else{
        db.getAllEmployees().then(function(data){
          response.json(data);
        }).catch(function(err){
          response.json({message: err});
        });
      }
  });

app.get("/employee/:num", function(request,response){
  db.getEmployeeByNum(request.params.num).then(function(data){
    response.json(data);
  }).catch(function(err){
      response.json({message: err});
  });
});

app.get("/managers", function(request,response){
      db.getManagers().then(function(data){
        response.json(data);
      }).catch(function(err){
        response.json({message: err});
      });
});

app.get("/departments", function(request,response){
      db.getDepartments().then(function(data){
        response.json(data);
      }).catch(function(err){
        response.json({message: err});
      });
});

app.use(function(request, response) {
  response.status(404).send("ERROR 404 : Page Not Found");
});
app.listen(HTTP_PORT, function(response,request){
       console.log("Express http server listening on: " + HTTP_PORT);
       db.initialize().then(function(data){
           console.log(data)
         }).catch(function(err){
           console.log(err);
         });
     });
