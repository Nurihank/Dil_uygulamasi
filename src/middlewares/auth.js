import jwt from "jsonwebtoken"
import mysql from "mysql";

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"15935738a",
    database:"dil_uygulamasi"
})

con.connect((err) =>{
    if(err) { throw err }
})

var admin = "admin"

export const authMiddleware = (req, res, next) => {  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
    //Bearer = token başta bu halde ondan split dedik bu headeri ikiye bölcek
    //const token = req.headers["authorization"]?.split(' ')[1]
    con.query("SELECT * FROM admin WHERE kullaniciAdi = ?",admin,(err,result)=>{
        if(err) throw err

        var token = result[0].accesToken

        if (!token) {
            return res.status(401).json({ message: "giriş yapin" }) //token yoksa 401 yani bu işlemi gerçekleştiemeizsin diyo
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { //tokeni doğruluyo eğer doğruysa user objesini döndürüyor 
            if (err) {  // burdaki token veritabanından gelcek
                return res.status(400).json(err)
            }
            
            next();
        })
    })
    
}
module.exports = authMiddleware;