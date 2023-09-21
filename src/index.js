import express from "express"
import mysql from "mysql"
import path from "path"
import bodyParser from "body-parser";
import kullaniciRouter from "./routes/kullaniciRouter.js"

const app = express();
const router = express.Router();


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

app.listen(3000,(err)=>{
    if(err){
        console.log("hata verdi")
    }
})
baglanti.connect(function(err){
    if(err){
        throw err
    }
    else{
        console.log("Connection Successful")
    }
})

console.log()
app.use("/kullanici",kullaniciRouter)
/* 
baglanti.query("SELECT kullaniciAdi FROM kullanici",(err,result,fields)=>{
    var kullaniciAdiString = JSON.parse(JSON.stringify(result))
    console.log(kullaniciAdiString[0].kullaniciAdi)
}) */


app.put("/deneme",(req,res)=>{
    /* kullaniciSchema.methods.createResetPasswordToken = function(){ 
        const resetPasswordToken = crypto.randomBytes(32,toString("hex"))
        
        //sha ile geri döndürülemeyecek şekilde şifrelenir
        return passwordTokken = crypto.createHash("sha252").update(resetPasswordToken).digest("hex")
    }

    console.log(kullaniciSchema) */
})




/* app.post("/kullaniciKayitOlma",(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    
    baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre) values (?,?)",[kullaniciAdi,sifre],(err)=>{
        if(err){
            throw err
        }
        else{
            res.send("Kullanici Eklendi")
        }
    })
    
}) */



































/* app.post("/kullaniciEkle",async(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    const MeslekID =req.body.MeslekID
    const SectigiDilID = req.body.SectigiDilID
    const DilID = req.body.DilID
    console.log(kullaniciAdi)

    baglanti.query('INSERT INTO kullanici (kullaniciAdi,şifre,MeslekID,SectigiDilID,DilID) values(?,?,?,?,?)',[kullaniciAdi,sifre,MeslekID,SectigiDilID,DilID],(err,result)=> {
        if(err){
            console.log(err)
        }else{
            res.send("Post")
        }

    })
})

app.get("/fetchId/:id", (req, res) => {  //Id ye göre veri tabanından veri getirme

    const fetchId = req.params.id
    baglanti.query("SELECT * FROM kullanici where id=?", fetchId, (err, result) => {
        res.send(result)
        var jsonResult = JSON.stringify(result)
        console.log(jsonResult)

    })
})

app.get("/fetch", (req, res) => {  //veri tabanından veri getirme

    baglanti.query("select kullaniciAdi from kullanici", (err, result, fields) => {  //kulaniciAdi sütununu getirdi
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) //postmane mesaj gönderir

            var adi = JSON.parse(JSON.stringify(result))
            console.log(adi[0]) //terminalde yazar 
            console.log(adi[2])
        }
    })
})

app.delete("/deleteData/:id",(req,res)=>{
    const id = req.params.id

    baglanti.query("DELETE FROM KULLANİCİ WHERE id=?",id,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.affectedRows==0){
                res.send("id not present")
            }else{
                res.send("Data Deleted")
            console.log(result)
            }
            
        }
    })
})

app.put("/update/:id",(req,res)=>{
    const updateId = req.params.id
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    const MeslekID =req.body.MeslekID
    const SectigiDilID = req.body.SectigiDilID
    const DilID = req.body.DilID

    baglanti.query("UPDATE kullanici SET kullaniciAdi=?,şifre=?,MeslekId=?,SectigiDilId=?,DilId=? WHERE id = ? ",[kullaniciAdi,sifre,MeslekID,SectigiDilID,DilID,updateId],(err)=>{
        if(err){
            throw err
        }else{
            baglanti.query("SELECT * FROM kullanici WHERE id = ?",updateId,(err,result)=>{
                if(err){
                    throw err
                }else{
                    res.send(result)
                }
            })
        }
    })
})
 */



 
