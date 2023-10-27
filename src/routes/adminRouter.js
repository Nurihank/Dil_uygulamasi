const router = require("express").Router();  //routerları export etmek için  
import mysql from "mysql" 
import util from "util"

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"15935738a",
    database:"dil_uygulamasi"
})

con.connect((err) =>{
    if(err) { throw err }

})