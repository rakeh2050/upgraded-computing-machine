/*********************************************************************************
*  WEB322 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this 
assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: JATIN ARORA__  Student ID:136897162_ Date: 16 October , 2017_
*
*  Online (Heroku) Link: https://as4-jarora4.herokuapp.com/
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 2000;
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

app.get("/products", function(request,response){
  
  if(request.query.status){
db.getEmployeesByStatus(request.query.status).then(function(data) {
  response.render("productList", { data: data, title: "Products" });
}).catch((err) => {
  response.render("productList", { data: {}, title: "Products" });
});

/////////////////////////////////////////////
  }
  
      else if(request.query.department){
        db.getEmployeesByDepartment(request.query.department).then((data) => {
          response.render("productList", { data: data, title: "Employees" });
      }).catch((err) => {
          response.render("productList", { data: {}, title: "Employees" });
      });
      }
      /////////////////////
      else if(request.query.manager){
        db.getEmployeesByManager(request.query.manager).then((data) => {

          response.render("productList", { data: data, title: "Employees" });
      }).catch((err) => {
          response.render("productList", { data: {}, title: "Employees" });
      });
      }else
      {
        db.getAllEmployees().then((data) => {
          response.render("productList", { data: data, title: "PRODUCTS" });
      }).catch((err) => {
          response.render("productList", { data: {}, title: "Employees" });
      });
      }


      
      
      
      
      
      /******{
        db.getAllEmployees().then((data) => {
         //////////////////////////////////////////////
        var contain="";
        console.log("rrrrrrrrr");
            for(i=0;i<data.length;i++)
            {
              console.log("loop");
               
                      var row_ = document.createElement('tr');
                      var col_ = document.createElement('td');
                      var media_ = document.createElement('img');
                      media_.setAttribute("src", data[i].image);
                      media_.setAttribute("width",142);
                      media_.setAttribute("height",142);
                      media_.setAttribute("alt","img");
                    
                      
                      col_.appendChild(media_);
                      row_.appendChild(col_);
      
                      var col2 = document.createElement('td');
                      row_.appendChild(col2);
                      var head = document.createElement('h2');
                      col2.appendChild(head);
                      var name_ = document.createTextNode(data[i].firstName);
                      head.appendChild(name_);
                      var p_ = document.createElement('p');
                      var div = document.createElement('span');
                      p_.innerHTML = data[i].address.description;
                                          
                      col2.appendChild(p_);
                     
                      ///////////////////*
                      
                   
                      /////////////////
                     
                      
                      col2.appendChild(div);
                      contain.appendChild(row_);
                    
            
            }
   console.log(contain);
            ///////////////////////////////////////////
            
      }).catch((err) => {
          response.render("productList", { data: {}, title: "Employees" });
      });
    
  
      }**************/
  });

app.get("/employee/:empNum", function(request,response){
  db.getEmployeeByNum(request.params.empNum).then((data) => {
    response.render("employee", { data: data });
}).catch((err) => {
    response.status(404).send("Employee Not Found!!!");
});
});


app.post("/employee/update", (req, res) => {
  db.updateEmployee(req.body).then((data) => {
      console.log("data::");
      console.log(req.body);
      res.redirect("/products");
  }).catch((err) => {
      console.log(err);
  })
});

app.get("/managers", function(request,response){
      db.getManagers().then(function(data){
        response.render("productList", { data: data, title: "Employees (Managers)" });
      }).catch(function(err){
        res.render("productList", { data: {}, title: "Employees (Managers)" });
      });
});

app.get("/departments", function(request,response){
      db.getDepartments().then(function(data){
        response.render("departmentList", { data: data, title: "Departments" });
      }).catch(function(err){
        response.render("departmentList", { data: data, title: "Departments" });
      });
});
app.get("/employees/add", (req,res) => {
  db.addEmployee().then((data) => {
    console.log("CART DATA &&&&&&&");
    console.log(data);
    res.render("shoppingCart", { data: data, title: "PRODUCTS" });
}).catch((err) => {
  console.log("ERRRRRRRRRR");
    res.render("about", { data: {}, title: "Employees" });
});
});
app.post("/employees/add", (req, res) => {
  db.addEmployee(req.body).then((data) => {
    console.log(req.body);
    res.redirect("/employees");
}).catch((err) => {
    console.log(err);
});
});

app.use(function(request, response) {
  response.status(404).send("ERROR 404 : Page Not Found");
});
app.listen(HTTP_PORT, function(response,request){
       console.log("Express http server listening on: " + HTTP_PORT);
       db.initialize()
       .then(function(data){
           console.log(data)
         }).catch(function(err){
           console.log(err);
         });
     });
