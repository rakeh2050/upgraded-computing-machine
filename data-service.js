/***********************
////////////////////////
* Jatin Arora
* 136897162
* WEB322 Assignment 03
\\\\\\\\\\\\\\\\\\\\\\\\
 **********************/

var fs = require("fs");
var employees = [];
var department = [];

module.exports.initialize = function(){
    
    return new Promise(function(resolve,reject){
        try{
            fs.readFile('./data/employees.json', function(err, data){
                if(err) 
                throw err;
                employees = JSON.parse(data);
            });
            fs.readFile('./data/departments.json', function(err,data){
                if(err) throw err;
                departments = JSON.parse(data);
            });
        }catch(ex){
            reject("Unable to read file!");
        }
        resolve("Reading Data Successful.");
    });
}
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
    var arryByStatus = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employees.length; i++){
            if(employees[i].status == status){
                arryByStatus.push(employees[i]);
            }
        }
        if (arryByStatus.length == 0){
            reject("No Result Returned!!!");
        }
        resolve(arryByStatus);
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