const router = require("express").Router();  //routerları export etmek için  
import mysql from "mysql" 
import md5 from "md5";
const jwt = require("jsonwebtoken");

var db =  require("../model/database")
var db = db.database
var getDb = new db()


var con = mysql.createConnection({
    host:getDb.getHost,
    user:getDb.getUser,
    password:getDb.getPassword,
    database:getDb.getDataBase
})

con.connect((err) =>{
    if(err) { throw err }

})

router.get("/signin",(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre

    var passwordToken = md5(sifre)

    con.query("SELECT * FROM admin WHERE kullaniciAdi = ?",kullaniciAdi,(err,result)=>{
        if(err) throw err
        
        if(passwordToken == result[0].sifre){

            const accessToken = jwt.sign({kullaniciAdi:kullaniciAdi},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"10m"})

            const refreshToken = jwt.sign({kullaniciAdi:kullaniciAdi},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:"120m"})

            con.query("UPDATE admin SET accesToken = ? , refreshToken = ? WHERE kullaniciAdi = ?",[accessToken,refreshToken,kullaniciAdi])
            res.json({accessToken:accessToken,refreshToken:refreshToken})         
        } 
    })   
})


module.exports = router;