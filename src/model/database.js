'use strict'
import mysql from "mysql" 



module.exports = class Database{
    
    constructor() {
       this.con = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"Team2010",
            database:"dil_uygulamasi"
        });
    }
    connect(){
        this.con.connect((err) =>{
            if(err) { throw err }
        });
    }
    getConnection(){
        return this.con;
    }
}