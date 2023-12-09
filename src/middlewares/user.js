import { get } from "express/lib/response";
import jwt from "jsonwebtoken"

var db = require("../model/database")
var getDB = new db();

getDB.connect();
var con = getDB.getConnection()

module.exports = class userMiddleware{

    
    constructor(kullaniciAdi){
        con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?",kullaniciAdi,(err,result,res)=>{

            var token = result[0].accesToken;
            //console.log(token)
            if(!token){
                return "giriş yap"
            }
    
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                if(err){
                    return "giriş yap"
                }
    
                        
            })
        })
    }
    
}
