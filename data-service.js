/***********************
////////////////////////
* Jatin Arora
* 136897162
* WEB322 Assignment 04
\\\\\\\\\\\\\\\\\\\\\\\\
 **********************/
// https://lcboapi.com/products?access_key=MDo5YTQyZjAzMC1iNTEzLTExZTctYjFmNS1kYmY2MTJlMTkzMzM6VDI1YTh5YlVhV3lXekE5QXh6ZGI4U0FJSHlxSVZGSklhWWhs
require('es6-promise').polyfill();
require('isomorphic-fetch');
var fs = require("fs");
var url=require("url");
var https=require("https");
var employees = [];
var department = [];
var empCount=0;
https.get('https://lcboapi.com/products?access_key=MDo5YTQyZjAzMC1iNTEzLTExZTctYjFmNS1kYmY2MTJlMTkzMzM6VDI1YTh5YlVhV3lXekE5QXh6ZGI4U0FJSHlxSVZGSklhWWhs',function(res)
{
    res.setEncoding('utf8');
    res.on('data', function (body) {
        console.log(body);
    });
});
module.exports.initialize = function(){
    fetch('https://lcboapi.com/products?access_key=MDo5YTQyZjAzMC1iNTEzLTExZTctYjFmNS1kYmY2MTJlMTkzMzM6VDI1YTh5YlVhV3lXekE5QXh6ZGI4U0FJSHlxSVZGSklhWWhs', {
        method: 'get'
    }).then(function(data) {
        console.log(data);
        
    }).catch(function(err) {
        console.log(err);
    });
}
    
//////////////////////////////////////////////

/////////////////////////////////////////////
   
    module.exports.getAllEmployees = function(){
        var EmpAll=[];
        return new Promise(function(resolve,reject){
            for (var i = 0; i < employees.length; i++) {
                EmpAll.push(employees[i]);
            }
            if (EmpAll.length == 0){
                reject("No Result Returned!!!");
            }
        resolve(EmpAll);
        })
    }
    
   
module.exports.getEmployeesByStatus = function(status){
    var empSts = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employees.length; i++){
            if(employees[i].status == status){
                empSts.push(employees[i]);
            }
        }
        if (empSts.length == 0){
            reject("No Result Returned!!!");
        }
        resolve(empSts);
    });
}
    
    module.exports.getEmployeesByDepartment = function(department){
        var EmpDep = [];
        return new Promise(function(resolve,reject){
            for(let i = 0; i < employees.length; i++){
                if(employees[i].department == department){
                    EmpDep.push(employees[i]);
                }
            }
            if(EmpDep.length == 0){
                reject("No Result");
            }
        resolve(EmpDep);
        });
    }
    
    module.exports.getEmployeesByManager = function(manager) {
        var EmpMan = [];
    
        return new Promise(function(resolve,reject) {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].employeeManagerNum == manager) {
                    EmpMan.push(employees[i]);
                }
            }
            if (EmpMan.length == 0 ) {
                reject("No Result");
            }
        resolve(EmpMan);
        });
    }
    
    module.exports.getEmployeeByNum = function(num) {
        return new Promise(function(resolve,reject){
            for(let j = 0; j < employees.length; j++){
                if(employees[j].employeeNum == num){
                    resolve(employees[j]);
                }
            }
        reject("No Result Returned!!!");
        });
    }
    
    module.exports.getManagers = function() {
        var Managers = [];
        return new Promise(function(resolve,reject){
            if(employees.length == 0){
                reject("No Result Returned!!!");
            }else{
                for (var q = 0; q < employees.length; q++) {
                     if (employees[q].isManager == true) {
                        Managers.push(employees[q]);       
                     }
                }
                if (Managers.length == 0) {
                         reject("No Result Returned!!!");
                 }
            }
            resolve(Managers);
         });
    }
    
    module.exports.getDepartments = function() {
        var Department = [];
        return new Promise(function(resolve,reject){
            if(employees.length == 0){
                reject("No Result Returned!!!");
            }else{
                for (var v = 0; v < departments.length; v++) {
                    Department.push(departments[v]);       
                }
                if (Department.length == 0) {
                    reject("No Result Return!!!");
                }
            }
        resolve(Department);
        });
    }
    module.exports.addEmployee = (employeeData) => {
     
        employeeData.employeeNum = ++empCount;
        return new Promise((resolve, reject) => {
            employees.push(employeeData);
            if (employees.length == 0) {
                reject();
            }
            resolve(employees);
        });
    }
    module.exports.updateEmployee = (employeeData) => {
       
        return new Promise((resolve, reject) => {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].employeeNum == employeeData.employeeNum) {
                    employees[i]=employeeData;
                }
            }
            if (employees.length == 0) {
                reject();
            }
            resolve(employees);
        });
    }