const router = require("express").Router(); //routerları export etmek için   
import util from "util"
const userMiddleware = require("../middlewares/user")
import md5 from "md5"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

var userModel = require("../model/userModel")

var db = require("../model/database")
var getDb = new db();
getDb.connect();
var con = getDb.getConnection();
const query = util.promisify(con.query).bind(con);   //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık

async function userEmail(email) {


    var result = await query("Select COUNT(*) as sayi FROM kullanici WHERE email = ?", email)

    var sayiString = JSON.parse(JSON.stringify(result))
    if (sayiString[0].sayi == 1) {
        return true
    }
    else {
        return false
    }
}

router.post("/signup", async (req, res) => {
    var con = getDb.getConnection();

    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    const email = req.body.email
    //react nativeden post isteği gönderirken direkt gönderirsen body ile alabilirsin 
    //ama ör:mahir { } ile gönderirsen req.body.mahir.kullaniciAdi ile erişirsin

    var getUserInfo = userModel.user  //user modelden import ediyoruz ve ordan fonk çağrıyoruz
    var userInfo = new getUserInfo(kullaniciAdi)

    var isUserExist = await userInfo.userFind(kullaniciAdi);
    var isEmailExist = await userEmail(email)
    console.log(req.body)

    var passwordToken = md5(sifre)
    if (isUserExist == false) {
        if (isEmailExist == false) {
            con.query("INSERT INTO kullanici (kullaniciAdi,şifre,email) values (?,?,?)", [kullaniciAdi, passwordToken, email], (err) => {
                if (err) throw err

                res.json({
                    status: "SUCCES",
                    message: "Başarili bir şekilde kayit oldun"
                })
            })
        }
        else {
            res.json({
                status: "FAILED",
                message: "Böyle bir e posta vardir"
            })
        }
    }
    else {
        res.json({
            status: "FAILED",
            message: "Böyle bir kullanici adi vardir"
        })
    }
})

router.get("/signin", async (req, res) => {
    var con = getDb.getConnection();

    const kullaniciAdi = req.query.kullaniciAdi;
    const sifre = req.query.sifre
    //react native'de get metodu gönderirken params ile göndercez burdan query metodu olarak alabiliz 
    console.log(req.query)

    var passwordToken = md5(sifre)

    var getUserInfo = userModel.user  //user modelden import ediyoruz ve ordan fonk çağrıyoruz
    var userInfo = new getUserInfo(kullaniciAdi)

    var isUserExist = await userInfo.userFind(kullaniciAdi)
    var user = await userInfo.userInfo(kullaniciAdi)


    if (isUserExist == true) {
        if (passwordToken == user[0].şifre) {

            const accessToken = jwt.sign({ id: user[0].id, kullaniciAdi: user[0].kullaniciAdi, email: user[0].email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" })
            con.query("UPDATE kullanici SET accesToken = ? WHERE kullaniciAdi = ? ", [accessToken, kullaniciAdi])
            res.json({ message: "Basarili bir sekilde giris yaptiniz", accessToken: accessToken, status: "SUCCES", id: user[0].id })
        } else {
            res.json({
                status: "FAILED",
                message: "Kullanici adi ve ya şifre hatalidir"
            })

        }
    } else {
        res.send({
            status: "FAILED",
            message: "Kullanici adi ve ya şifre hatalidir"
        })

    }

})




router.post("/forgetPasswordCode", async (req, res) => {
    var con = getDb.getConnection();

    const kullaniciAdi = req.body.kullaniciAdi
    const email = req.body.email;
    // const yeniSifre = req.body.yeniSifre

    var getUserInfo = userModel.user  //user modelden import ediyoruz ve ordan fonk çağrıyoruz
    var userInfo = new getUserInfo(kullaniciAdi)

    var isUserExist = await userInfo.userFind(kullaniciAdi)
    var user = await userInfo.userInfo(kullaniciAdi)


    if (isUserExist == true) {

        con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi, (err, result) => {
            if (user[0].email == email) {

                async function codeUret(min, max) {
                    var sayi = ""
                    var sayi = Math.floor(Math.random() * (max - min)) + min
                    return sayi
                }
                var code = "1000"
                var codeToken = md5(code)

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'kavalcinurihan@gmail.com',
                        pass: 'lfxtfgzyiserimdn'
                    },
                    postman: res.json({
                        message: "Code gönderildi"
                    })
                })
                transporter.sendMail({
                    from: '"You" <kavalcinurihan@gmail.com>',
                    to: email,
                    subject: "VERIFICATION CODE",
                    html: code,
                })
                con.query("UPDATE kullanici SET forgetPasswordToken = ? WHERE kullaniciAdi= ? ", [codeToken, kullaniciAdi], (err) => {
                    if (err) {
                        throw err
                    }
                    else {
                    }
                })
            }
            else {
                res.json({
                    succes: "FAILED",
                    message: "Kullanici adi ve email eşleşmiyo"
                })
            }
        })
    } else {
        res.json({
            status: "FAILED",
            message: "Kullanici adi hatalidir"
        })
    }
})

router.put("/forgetPassword", async (req, res) => {
    var con = getDb.getConnection();

    const kullaniciAdi = req.body.kullaniciAdi
    const code = req.body.code;
    const newPassword = req.body.newPassword

    var codeToken = md5(code)

    var getUserInfo = userModel.user  //user modelden import ediyoruz ve ordan fonk çağrıyoruz
    var userInfo = new getUserInfo(kullaniciAdi)

    var isUserExist = await userInfo.userFind(kullaniciAdi)
    var newPasswordToken = md5(newPassword)
    if (isUserExist == true) {
        con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", [kullaniciAdi], (err, result) => {
            if (err) {
                throw err
            }
            else {
                var jsonResult = JSON.parse(JSON.stringify(result))
                var codeDtToken = result[0].forgetPasswordToken

                if (codeToken == codeDtToken) {
                    con.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ?", [newPasswordToken, kullaniciAdi], (err) => {
                        if (err) {
                            throw err
                        }
                        else {
                            res.send({ message: "Şifre değiştirildi" })
                        }
                    })
                }
                else {
                    res.json({ message: "Yanlis veya eksik kod" })
                }
            }
        })
    }
    else {
        res.json({
            message: "Kullanici adi hatali veya eksiktir"
        })
    }
})

router.post("/changePasswordCode", userMiddleware, async (req, res) => {
    var con = getDb.getConnection();

    const kullaniciAdi = req.body.kullaniciAdi;
    const oldPassword = req.body.oldPassword
    const email = req.body.email

    var oldPasswordToken = md5(oldPassword)

    var getUserInfo = userModel.user  //user modelden import ediyoruz ve ordan fonk çağrıyoruz
    var userInfo = new getUserInfo(kullaniciAdi)

    var isUserExist = await userInfo.userFind(kullaniciAdi)
    var user = await userInfo.userInfo(kullaniciAdi)

    var code = "1001"
    var codeToken = md5(code)

    if (isUserExist == true && user[0].şifre == oldPasswordToken) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'kavalcinurihan@gmail.com',
                pass: 'lfxtfgzyiserimdn'
            },
            postman: res.json({
                message: "Code gönderildi"
            })
        })
        transporter.sendMail({
            from: '"You" <kavalcinurihan@gmail.com>',
            to: email,
            subject: "VERIFICATION CODE",
            html: code,
        })
        con.query("UPDATE kullanici SET changePasswordToken = ? WHERE kullaniciAdi = ? ", [codeToken, kullaniciAdi])
    }
    else {
        res.json({ message: "Yanliş kullanici adi ve ya şifre" })
    }
})

router.put("/changePassword", userMiddleware, async (req, res) => {
    var con = getDb.getConnection();
    const kullaniciAdi = req.body.kullaniciAdi
    const code = req.body.code;
    const newPassword = req.body.newPassword

    var getUserInfo = userModel.user  //user modelden import ediyoruz ve ordan fonk çağrıyoruz
    var userInfo = new getUserInfo(kullaniciAdi)

    var isUserExist = await userInfo.userFind()
    var codeToken = md5(code)
    var newPasswordToken = md5(newPassword)

    if (isUserExist == true) {
        con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ", [kullaniciAdi], (err, result) => {
            if (result[0].changePasswordToken == codeToken) {
                con.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ? ", [newPasswordToken, kullaniciAdi], (err) => {
                    if (err) {
                        throw err
                    }
                })
                res.json({ message: "Sifre degistirilmistir" })
            }
            else {
                res.json({ message: "Yanlis ve ya eksik kod" })
            }
        })
    } else {
        res.send({ message: "Böyle bir kullanici yoktur" })
    }
})

router.post("/meslekSecim",(req,res)=>{
    const meslek = req.body.meslek
    const id = req.body.id
    var con = getDb.getConnection()
   
    con.query("SELECT * FROM meslek WHERE meslek = ? ",[meslek],(err,result)=>{
        if(err){
            throw err
        }
        con.query("UPDATE kullanici SET MeslekID = ? WHERE kullaniciAdi = ? ", [result[0].idMeslek,id])
    })
})

router.get("/user/:id", (req, res) => {
    const id = req.params.id
    var con = getDb.getConnection()
    
    con.query("SELECT * FROM kullanici WHERE id = ?", [id], (err, result) => {
        if (err) {
            throw err
        }     
        res.send(result)
    })

})

module.exports = router