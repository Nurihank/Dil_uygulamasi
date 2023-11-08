import { json } from "body-parser";
import mysql from "mysql" 
import util from "util"

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"dil_uygulamasi",
    password:"15935738a"
})

con.connect((err)=>{
    if(err)
        console.log("Hata")
})


exports.user = function(kullaniciAdi){  

    this.getUser = function(){
        con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ",kullaniciAdi,(err,result)=>{
            console.log(result[0])            
        })
    }

    
    
}



