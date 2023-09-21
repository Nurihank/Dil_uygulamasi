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
//buraya schema oluşturuyorum onları başka yera taşıyacam


/* kullaniciSchema.methods.createResetPasswordToken = () =>{ 
    const resetPasswordToken = crypto.randomBytes(32,toString("hex"))
    
    //sha ile geri döndürülemeyecek şekilde şifrelenir
    return passwordTokken = crypto.createHash("sha252").update(resetPasswordToken).digest("hex")
} */


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
            console.log("Connection Successfull")
        }
    })


    const query = util.promisify(baglanti.query).bind(baglanti);

async function userFind(kullaniciAdi) {
  var result = await query("Select COUNT(*) as sayi FROM kullanici WHERE kullaniciAdi = ?",kullaniciAdi,);
  var sayiString = JSON.parse(JSON.stringify(result))
  console.log(sayiString[0].sayi)
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
    if(sayiString[0].sayi == "1"){
        return true
    }
    else{
        return false
    }
}

/* function user(kullaniciAdi){
    baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ",kullaniciAdi,(err,result)=>{
        var resultString = JSON.parse(JSON.stringify(result))
        console.log(resultString)
    })
} */

//userFind("NurihanK")
//user("NurihanK")

global.check
router.post("/signup",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    const email = req.body.email
    var isUserExist = await userFind(kullaniciAdi);


    
    var passwordToken = md5(sifre)
    console.log(isUserExist)
    if(isUserExist == false){
        if(userEmail(email) == 0){
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
    /* baglanti.query("SELECT kullaniciAdi FROM kullanici",(err,result)=>{
        var kullaniciAdiString = JSON.parse(JSON.stringify(result))
        if(err){
            throw err
        }else{
            for(var i = 0 ; i < kullaniciAdiString.length ; i++){
                
                if(kullaniciAdiString[i].kullaniciAdi == kullaniciAdi){  //epostayı ayrı bi yerde if diyeceksin checkeposta yapacan
                    global.check = false

                }else{
                    global.check = true
                }
            }
            if(global.check == true){
                baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre,email) values (?,?,?)",[kullaniciAdi,passwordToken,email],(err)=>{
                    if(err) throw err
                   res.json({
                    status:"SUCCES",
                    message:"Başarili bir şekilde kayit oldun"
                    //accessToken:passwordToken
                   })
                }) 
            }else{
                res.json({
                    status:"FAILED",
                    message:"Böyle bir kullanici vardir"
                }) 
            }
        }
    }) */
})    

router.get("/signin",async (req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi;
    const sifre = req.body.sifre
   
    var passwordToken = md5(sifre)

    baglanti.query("SELECT * FROM kullanici",(err,result)=>{
        var kullaniciAdiSifre = JSON.parse(JSON.stringify(result))
        //console.log(sifre)
        if(err){
            throw err
        }else{
            for(var i = 0 ; i < kullaniciAdiSifre.length ; i++){
                if(kullaniciAdiSifre[i].kullaniciAdi == kullaniciAdi && kullaniciAdiSifre[i].şifre == passwordToken){    //boolean olanı yapcan buraya 
                    global.check = true
                    
                }else{
                    global.check = false
                    
                }
            }
            if(global.check == true){
                res.json({
                    status:"SUCCES",
                    message:"Başarili bir şekilde giriş"
                })
                 
            }else{
                res.json({
                    status:"FAILED",
                    message:"Kullanici adi ve ya şifre hatalidir"
                }) 
            }
        }
    })
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

global.check2;
router.post("/forgotPasswordCode",async (req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const email = req.body.email;
    //const yeniSifre = req.body.yeniSifre
    baglanti.query("SELECT COUNT(*) as sayi FROM kullanici WHERE kullaniciadi = ?" ,(err,result)=>{
        if(err){
            throw err
        }else{
            var kullaniciAdiString = JSON.parse(JSON.stringify(result))
            function sayiUret(min,max){
                var sayi = Math.floor(Math.random()*(max-min))+min
                return sayi
            }
            var uretilenSayi = sayiUret(1000,99999);
            for(var i = 0 ; i < kullaniciAdiString.length ; i++){
                console.log("a")
                if(kullaniciAdiString[i].kullaniciAdi == kullaniciAdi){
                    let transporter = nodemailer.createTransport({
                        host:"smtp.gmail.com",
                        port:465,
                        secure:true,
                        auth:{
                            user:'kavalcinurihan@gmail.com',
                            pass:'lfxtfgzyiserimdn'
                        },
                    })
                    console.log("a")
    
                    transporter.sendMail({
                        from:'"You" <kavalcinurihan@gmail.com>',
                        to:email,
                        subject:"Verification Code",
                        html:uretilenSayi,
                    })
                    console.log("a")
                    res.json({
                        succeeded: true,
                        message:uretilenSayi

                    })
                    console.log("a")
                }else{
                    global.check2 = false;
                }
            }
        }
    })
    




    /* let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:'kavalcinurihan@gmail.com',
            pass:'lfxtfgzyiserimdn'
        },
    })

    
    await transporter.sendMail({
        from:'"You" <kavalcinurihan@gmail.com>',
        to:email,
        subject:"Verification Code",
        html:`<p>?</p>`,
    })
    
    res.json({
        succeeded: true
    }) */
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