import jwt from "jsonwebtoken"
import util from "util"

var db = require("../model/database")
var getDb = new db();
getDb.connect(); //sql bağlantısı yaptık


export const userMiddleware = (req,res,next) =>{

    var con = getDb.getConnection(); //bağlantıyı getirdik 

    const userMiddleware = function(kullaniciAdi){
        
        con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?",[kullaniciAdi],(err,result)=>{
            if(err) throw err;

            const token = result[0].accesToken
            if(!token){
                console.log("asd")
                return res.status(401).json({message : "Giriş yapin"}) //token yoksa giriş yap mesajı gönderir
            }
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err)=>{
                if(err){
                    console.log(amk)
                    return res.status(400).json(err)
                }
            })
            next();
        })
    }
}


