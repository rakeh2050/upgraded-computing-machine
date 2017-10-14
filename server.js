/*********************************************************************************
*  WEB322 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this 
assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: JATIN ARORA__  Student ID:136897162_ Date: 2nd October , 2017_
*
*  Online (Heroku) Link: https://as3-jarora4.herokuapp.com/
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var db = require("./data-service.js");
app.use(express.static(__dirname + '/public/'));
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: 'layout',
  helpers: {
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
}));
app.set("view engine", ".hbs");



app.get("/", function(request,response){
   
   response.render("home");
});


app.get("/about", function(request,response){
  response.render("about");
});

app.get("/employees", function(request,response){
  
  if(request.query.status){
db.getEmployeesByStatus(request.query.status).then(function(data) {
  response.render("employeeList", { data: data, title: "Employees" });
}).catch((err) => {
  response.render("employeeList", { data: {}, title: "Employees" });
});

/////////////////////////////////////////////
  }
  
      else if(request.query.department){
        db.getEmployeesByDepartment(request.query.department).then((data) => {
          response.render("employeeList", { data: data, title: "Employees" });
      }).catch((err) => {
          response.render("employeeList", { data: {}, title: "Employees" });
      });
      }
      /////////////////////
      else if(request.query.manager){
        db.getEmployeesByManager(request.query.manager).then((data) => {
          response.render("employeeList", { data: data, title: "Employees" });
      }).catch((err) => {
          response.render("employeeList", { data: {}, title: "Employees" });
      });
      }else{
        db.getAllEmployees().then((data) => {
          response.render("employeeList", { data: data, title: "Employees" });
      }).catch((err) => {
          response.render("employeeList", { data: {}, title: "Employees" });
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
        response.render("employeeList", { data: data, title: "Employees (Managers)" });
      }).catch(function(err){
        res.render("employeeList", { data: {}, title: "Employees (Managers)" });
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
