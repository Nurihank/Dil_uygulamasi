import jwt from "jsonwebtoken"
import mysql from "mysql";

var db = require("../model/database")  //database modelini çağırdık
var getDb = new db();  //objemizi oluşturduk

getDb.connect();  //veri tabanı bağlantısını yaptık

var admin = "admin"

export const authMiddleware = (req, res, next) => {  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
    //Bearer = token başta bu halde ondan split dedik bu headeri ikiye bölcek
    const requestToken = req.headers["authorization"]?.split(' ')[1] ?? null;

    var con = getDb.getConnection();  //burda da bağlantıyı getirdik
    
    con.query("SELECT * FROM admin WHERE kullaniciAdi = ?",admin,(err,result)=>{
        if(err) throw err

        var token = result[0].accesToken

        
        if(requestToken == null ){
            return res.status(403).json({ message: "Token Gereklidir" })
        }


        if(requestToken != token){
            return res.status(403).json({ message: "Hatalı Token" })
        }
        
        if (!token) {  //hiç giriş yapmadıysa bu hatayı verir 
            return res.status(401).json({ message: "giriş yapin" }) //token yoksa 401 yani bu işlemi gerçekleştiemeizsin diyo
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { 
            if (err) {  // burdaki token veritabanından gelcek
                return res.status(400).json(err)
            }  //tokenin süresi geçtiyse hata verir
            
            next();
        })
    })
    
}
module.exports = authMiddleware;