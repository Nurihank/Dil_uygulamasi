'use strict'
import mysql from "mysql"



module.exports = class Database {

    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "15935738a",
            database: "dil_uygulamasi"
        });
    }
    connect() {
        this.con.connect((err) => {
            if (err) { throw err }
        });
    }
    getConnection() {
        return this.con;
    }
}