const router = require("express").Router();
import mysql from "mysql"
import util from "util"
import bodyParser, { json } from "body-parser";
import express from "express"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import md5 from "md5"
import nodemailer from "nodemailer"

//crypto nedir araştır bak ve procademy den kurslara bak modeller vb


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

var baglanti = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"15935738a",
    database:"ingilizce_uygulamasi"
    })

    baglanti.connect((err)=>{
        if(err){
            throw err
        }else{
            console.log("Connection Successful")
        }
    })


const query = util.promisify(baglanti.query).bind(baglanti);  //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık

async function userFind(kullaniciAdi) {
  var result = await query("Select COUNT(*) as sayi FROM kullanici WHERE kullaniciAdi = ?",kullaniciAdi);
  var sayiString = JSON.parse(JSON.stringify(result))
  //console.log(sayiString[0].sayi)
  if(sayiString[0].sayi){
      return true
  }
  else{
      return false
  }
}


async function userEmail(email){ 
    var result = await query("Select COUNT(*) as sayi FROM kullanici WHERE email = ?",email)
    
    var sayiString = JSON.parse(JSON.stringify(result))
    if(sayiString[0].sayi == 1){
        return true
    }
    else{
        return false
    }
}

async function userPassword(şifre){
    var passwordToken = md5(şifre)
    var result = await query("SELECT COUNT(*) as sayi FROM kullanici WHERE şifre = ?",passwordToken)
    var sayiString = JSON.parse(JSON.stringify(result))
    if(sayiString[0].sayi == 1){
        return true
    }
    else{
        return false
    }
}


global.check
router.post("/signup",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    const email = req.body.email
    var isUserExist = await userFind(kullaniciAdi);
    var isEmailExist = await userEmail(email)

    
    var passwordToken = md5(sifre)
    //console.log(isUserExist)
    if(isUserExist == false){
        //console.log(isEmailExist)
        if(isEmailExist == false){
            baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre,email) values (?,?,?)",[kullaniciAdi,passwordToken,email],(err)=>{
                if(err) throw err

                res.json({
                    status:"SUCCES",
                    message:"Başarili bir şekilde kayit oldun"
                    //accessToken:passwordToken
                })
            }) 
        }
        else{
            res.json({
                status:"FAILED",
                message:"Böyle bir e posta vardir"
            })
        }
        
    }
    else{
        res.json({
            status:"FAILED",
            message:"Böyle bir kullanici adi vardir"
        }) 
    }
})    

router.get("/signin",async (req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi;
    const sifre = req.body.sifre
   
    var passwordToken = md5(sifre)

    var isUserExist = await userFind(kullaniciAdi)
    var sifreDT = await userPassword(sifre)

    if(isUserExist == true && sifreDT == true){
        res.json({
            status:"SUCCES",
            message:"Basarili bir sekilde giris yaptini<"
        })
    }
    else{
        res.json({
            status:"FAILED",
            message:"Kullanici adi ve ya sifre hatali"
        })
    }

})

router.put("/meslekDilSecimi",(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const meslek = req.body.meslek
    const dil = req.body.dil
    const sectigiDil = req.body.sectigiDil

    baglanti.query("SELECT * FROM kullanici",(err,result)=>{
        var kullaniciAdiString = JSON.parse(JSON.stringify(result))
        if(err){
            throw err
        }
        else{
            for(var i = 0 ; i < kullaniciAdiString.length ; i++){
                if(kullaniciAdiString[i].kullaniciAdi == kullaniciAdi){
                    baglanti.query("SELECT * FROM meslek",(err,result)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            var meslekIdString = JSON.parse(JSON.stringify(result))
                            for(var i = 0 ; i < meslekIdString.length ; i++){
                                console.log(meslekIdString[0].Meslek)
                                if(meslek == meslekIdString[i].Meslek){
                                    const idJop = meslekIdString[i].idMeslek
                                    baglanti.query("UPDATE kullanici SET MeslekID = ? WHERE kullaniciAdi = ?",[idJop,kullaniciAdi],(err)=>{
                                        if(err){
                                            throw err
                                        }else{
                                            res.send("Guncellendi")
                                        }
                                    })
                                }
                                /* else{
                                    res.send("Böyle bir meslek bulunamadi")
                                } */
                            }
                        }
                    })
                        
                }
                if(kullaniciAdiString[i].kullaniciAdi == kullaniciAdi){
                    baglanti.query("SELECT * FROM dil",(err,result)=>{
                        if(err){
                            throw err
                        }
                        else{
                            var dilIdString = JSON.parse(JSON.stringify(result))
                            for(var i = 0 ; i < dilIdString.length ; i++){
                                if(dil == dilIdString[i].Dil){
                                    console.log(dilIdString[i].Dil)
                                    const idDil = dilIdString[i].idDil
                                    baglanti.query("UPDATE kullanici SET DilID = ? WHERE kullaniciAdi = ?",[idDil,kullaniciAdi],(err)=>{
                                        if(err){
                                            throw err
                                        }
                                    })
                                }
                            }
                        }
                    })       
                }
                if(kullaniciAdiString[i].kullaniciAdi == kullaniciAdi){
                    baglanti.query("SELECT * FROM dil",(err,result)=>{
                        if(err){
                            throw err
                        }
                        else{
                            var SectigidilIdString = JSON.parse(JSON.stringify(result))
                            for(var i = 0 ; i < SectigidilIdString.length ; i++){
                                if(sectigiDil == SectigidilIdString[i].Dil){
                                    console.log(SectigidilIdString[i].Dil)
                                    const idDil = SectigidilIdString[i].idDil
                                    baglanti.query("UPDATE kullanici SET SectigiDilID = ? WHERE kullaniciAdi = ?",[idDil,kullaniciAdi],(err)=>{
                                        if(err){
                                            throw err
                                        }
                                    })
                                }
                            }
                        }
                    })       
                }
            }
             
        }
        

    })
})

router.post("/forgetPasswordCode",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const email = req.body.email;
   // const yeniSifre = req.body.yeniSifre

    var isUserExist = await userFind(kullaniciAdi)
    var isEmailExist = await userEmail(email)   

    
    if(isUserExist == true){

        baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?",kullaniciAdi,(err,result)=>{
            var emailMatch = JSON.parse(JSON.stringify(result))
            if(emailMatch[0].email == email){

                async function codeUret(min,max){
                    var sayi = ""
                    var sayi = Math.floor(Math.random()*(max-min))+min
                    return sayi
                }
                var code = "1000"
                var codeToken = md5(code)
            
                let transporter = nodemailer.createTransport({
                    host:"smtp.gmail.com",
                    port:465,
                    secure:true,
                    auth:{
                        user:'kavalcinurihan@gmail.com',
                        pass:'lfxtfgzyiserimdn'
                    },
                    postman:res.json({
                        message:"Code gönderildi"
                    })
                })
                transporter.sendMail({
                    from:'"You" <kavalcinurihan@gmail.com>',
                    to:email,
                    subject:"VERIFICATION CODE",
                    html:code,
                })
                baglanti.query("UPDATE kullanici SET forgetPasswordToken = ? WHERE kullaniciAdi= ? ",[ codeToken,kullaniciAdi],(err)=>{
                    if(err){
                        throw err
                    }
                    else{   
                    }
                })
            }
            else{
                res.json({
                    succes:"FAILED",
                    message:"Kullanici adi ve email eşleşmiyo"
                })
            }
        })
    }else{
        res.json({
            status:"FAILED",
            message:"Kullanici adi hatalidir"
        })
    }
})

router.put("/forgetPassword",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const code = req.body.code;
    const newPassword = req.body.newPassword

    var codeToken = md5(code)
    var isUserExist = await userFind(kullaniciAdi)
    if(isUserExist == true)
    {baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?",[kullaniciAdi],(err,result)=>{
        if(err){
            throw err
        }
        else{
            var jsonResult = JSON.parse(JSON.stringify(result))
            console.log(jsonResult[0].forgetPasswordToken)
            var codeDtToken = result[0].forgetPasswordToken
            if(codeToken == codeDtToken){
                baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ?",[newPassword,kullaniciAdi],(err)=>{
                    if(err){
                        throw err
                    }
                    else{
                        res.send("Şifre değiştirildi")
                    }
                })
            }
            else{
                res.send("Yanlis ve ya eksik kod")
            }
        }
    })}
    else{
        res.send("Böyle bir kullanici adi yoktur")
    }
})


global.check1;
router.put("/changePassword",(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi;
    const sifre = req.body.sifre
    const newPassword = req.body.newPassword

    var passwordToken = md5(sifre)
    var newPasswordToken = md5(newPassword)

    baglanti.query("SELECT * FROM kullanici",(err,result)=>{
        var kullaniciAdiSifre = JSON.parse(JSON.stringify(result))
        for(var i = 0 ; i < kullaniciAdiSifre.length ; i++){    
            if(kullaniciAdiSifre[i].kullaniciAdi == kullaniciAdi && kullaniciAdiSifre[i].şifre == passwordToken){
                global.check1 = true
            }else{
                global.check1 = false
            }
        }
        if(global.check1 == true){
            baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ? ",[newPasswordToken,kullaniciAdi],(err,result)=>{
                res.send("Sifreni başarili bir şekilde degistirdin")
            })
        }else{
            res.send("Yanliş şifre ya da kullanici adi girdiniz")
        }
    })
    
})



module.exports = router;