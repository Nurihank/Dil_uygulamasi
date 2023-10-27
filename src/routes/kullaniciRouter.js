const router = require("express").Router(); //routerları export etmek için   
import mysql from "mysql"
import util from "util"
import bodyParser, { json } from "body-parser";
import md5 from "md5"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

var baglanti = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"15935738a",
    database:"dil_uygulamasi"
    })

    baglanti.connect((err)=>{
        if(err){
            throw err
        }else{
            console.log("Connection Successful")
        }
    })


const query = util.promisify(baglanti.query).bind(baglanti);  //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık

async function userData(kullaniciAdi){
    var result = await query("SELECT * FROM kullanici WHERE kullaniciAdi = ?",kullaniciAdi)
    return result
}

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


router.post("/signup",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    const email = req.body.email
    var isUserExist = await userFind(kullaniciAdi);
    var isEmailExist = await userEmail(email)

    
    var passwordToken = md5(sifre)
    if(isUserExist == false){      
        if(isEmailExist == false){
            baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre,email) values (?,?,?)",[kullaniciAdi,passwordToken,email],(err)=>{
                if(err) throw err

                res.json({
                    status:"SUCCES",
                    message:"Başarili bir şekilde kayit oldun"  
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

/* router.get("/deneme",async(req,res)=>{
    var dene = await user("NurihanK")
    res.send(dene[0].kullaniciAdi)

}) */

router.get("/signin",async (req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi;
    const sifre = req.body.sifre
   
    var passwordToken = md5(sifre)

    var isUserExist = await userFind(kullaniciAdi)
    var user = await userData(kullaniciAdi)
    

    if(isUserExist == true ){
        if(passwordToken == user[0].şifre){

            const accessToken = jwt.sign({kullaniciAdi:user[0].kullaniciAdi,email:user[0].email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"15m"})
            baglanti.query("UPDATE kullanici SET accesToken = ? WHERE kullaniciAdi = ? ",[accessToken,kullaniciAdi])
            res.json({message:"Basarili bir sekilde giris yaptiniz",accesToken:accessToken})
        }else{
            res.send("Kullanici adi ve ya şifre hatalidir")
        }
    }else{
        res.send("Böyle bir kullanici adi yoktur")

    }

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
    var newPasswordToken = md5(newPassword)
    if(isUserExist == true)
    {baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?",[kullaniciAdi],(err,result)=>{
        if(err){
            throw err
        }
        else{
            var jsonResult = JSON.parse(JSON.stringify(result))
            var codeDtToken = result[0].forgetPasswordToken

            if(codeToken == codeDtToken){
                baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ?",[newPasswordToken,kullaniciAdi],(err)=>{
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

router.put("/changePasswordCode",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi;
    const oldPassword = req.body.oldPassword
    const email = req.body.email

    var oldPasswordToken = md5(oldPassword)

    var isUserExist = await userFind(kullaniciAdi)
    var correctPassword = await userPassword(oldPassword)

    var code = "1001"
    var codeToken = md5(code)
    console.log(codeToken)
    if(isUserExist == true && correctPassword == true){
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
        baglanti.query("UPDATE kullanici SET changePasswordToken = ? WHERE kullaniciAdi = ? ",[codeToken,kullaniciAdi])
    }
    else{
        res.send("Yanliş kullanici adi ve ya şifre")
    }
})

router.put("/changePassword",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const code = req.body.code;
    const newPassword = req.body.newPassword

    var isUserExist = await userFind(kullaniciAdi)
    var codeToken = md5(code)
    var newPasswordToken = md5(newPassword)

    if(isUserExist == true){
        baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ? " ,[kullaniciAdi],(err,result)=>{
            if(result[0].changePasswordToken == codeToken){
                baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ? ",[newPasswordToken,kullaniciAdi],(err)=>{
                    if(err){
                        throw err
                    }
                })
                res.send("Sifre degistirilmistir")
            }
            else{
                res.send("Yanlis ve ya eksik kod")
            }
        })
    }else{
        res.send("Böyle bir kullanici yoktur")
    }
})



module.exports = router