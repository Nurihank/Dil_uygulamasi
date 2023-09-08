const router = require("express").Router();
import mysql from "mysql"
import bodyParser, { json } from "body-parser";
import express from "express"

module.exports = router;

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




router.post("/kullaniciKayitOlma",(req,res)=>{
    const kullaniciAdi = req.body.kullaniciAdi
    const sifre = req.body.sifre
    
    baglanti.query("SELECT kullaniciAdi FROM kullanici",(err,result)=>{
        var kullaniciAdiString = JSON.parse(JSON.stringify(result))
        if(err){
            throw err
        }else{
            for(var i = 0 ; i < kullaniciAdiString.length ; i++){
                if(kullaniciAdiString[i].kullaniciAdi == kullaniciAdi){    //boolean olanı yapcan buraya 
                    res.send("eklenmedi") 
                }else{
                    baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre) values (?,?)",[kullaniciAdi,sifre],(err)=>{
                        if(err) throw err

                       res.send("eklendi")
                    })
                }
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