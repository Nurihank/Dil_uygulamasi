const router = require("express").Router();  //routerları export etmek için  
import mysql from "mysql" 
import md5 from "md5";
const jwt = require("jsonwebtoken");

var db = require("../model/database")
var getDb = new db();
getDb.connect();

router.get("/signin",(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre

    var passwordToken = md5(sifre)

    var con = getDb.getConnection();
//kullanıcı hatasını kontrol eden bir kod yaz unutma
    con.query("SELECT * FROM admin WHERE kullaniciAdi = ?",kullaniciAdi,(err,result)=>{
        if(err) throw err
        
        //girişte sıkıntı var hallet 
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
        else{
            res.send("şifre hatalı")
        }
    })   
})


module.exports = router;