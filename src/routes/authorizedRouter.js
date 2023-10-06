const router = require("express").Router();//routerları export etmek için   
import mysql from "mysql" //sql bağlantısı kurmak için
import express from "express";
import util from "util"

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"15935738a",
    database:"dil_uygulamasi"
})

con.connect((err)=>{
    if(err){
        throw err
    }
    else{
        console.log("Connection Successful")
    }
})

const query = util.promisify(con.query).bind(con);


//bilgileri getirme usermodel tarzı bişiler yapacaksın
async function languageFind(language){
    var result = await query("Select COUNT(*) as sayi FROM dil WHERE dil_adi = ?",language);
    console.log(result[0].sayi)
    if(result[0].sayi==1){
        return true
    }
    else{
        return false
    }
}

async function jobFind(meslek){
    var result = await query("Select COUNT(*) as sayi FROM meslek WHERE meslek = ?",meslek);
    console.log(result[0].sayi)
    if(result[0].sayi==1){
        return true
    }
    else{
        return false
    }
}

async function wordFind(word){
    var result = await query("SELECT COUNT(*) as sayi FROM kelime WHERE kelime = ?",word)
    if(result[0].sayi){
        return true
    }else{
        return false
    }
}

router.get("/language",(req,res)=>{
    con.query("SELECT * FROM dil",(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})

router.get("/language/:id",(req,res)=>{
    const id = req.params.id

    con.query("SELECT * FROM dil where id = ? ",id,(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})

router.post("/addLanguage",async(req,res)=>{
    const dil = req.body.dil
    const isLanguageExist = await languageFind(dil)
    
    if(isLanguageExist == true){
        res.send("Böyle bir dil vardir")
    }else{
        con.query("INSERT INTO dil (dil_adi) values (?)",dil,(err,result)=>{
            if(err){
                throw err
            }
            res.send("Dil eklendi")
        })
    }
})

router.get("/job",(req,res)=>{
    con.query("SELECT * FROM meslek",(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.get("/job/:id",(req,res)=>{
    const id = req.params.id
    con.query("SELECT * FROM meslek where idMeslek = ?",id,(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.post("/addJob",async(req,res)=>{
    const job = req.body.job
    const isJobExist = await jobFind(job)

    if(isJobExist == true){
        res.send("Böyle bir meslek vardir")
    }
    else{
        con.query("INSERT INTO meslek (meslek) values (?)",job,(err,result)=>{
            if(err){
               throw err
            }
            res.send("Meslek eklendi")
        })
    }
    
})

router.get("/word",(req,res)=>{
    con.query("SELECT * FROM kelime",(err,result)=>{
        res.send(result)
    })
})

router.get("/word/:id",(req,res)=>{
    const id = req.params.id;

    con.query("SELECT * FROM kelime Where id = ?",id,(err,result)=>{
        res.send(result)
    })
})

router.post("/addWord",async(req,res)=>{
    const kelime = req.body.kelime
    const kategori_id = req.body.kategori_id

    const isWordExist = await wordFind(kelime)

    if(isWordExist == true){
        res.send("Böyle bir kelime vardir")
    }else{
        con.query("INSERT INTO kelime (kategori_id,kelime) values (?,?)",[kategori_id,kelime],(err,result)=>{
            if(err){
                throw err
            }else{
                res.send("Kelime eklendi")
            }
        })
        
    }

})

router.get("/category",(req,res)=>{
    con.query("SELECT * FROM kategori",(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.get("/category/:id",(req,res)=>{
    const id = req.params.id
    
    con.query("SELECT * FROM kategori WHERE id = ?",id,(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.post("/addCategory",(req,res)=>{
    const kategori = req.body.kategori
    const meslek_id = req.body.meslek_id

    con.query("INSERT INTO kategori (kategori,meslek_id) values (?,?)",[kategori,meslek_id],(err,result)=>{
        if(err){
            throw err
        }
        res.send("Kategori eklendi")
    })
})





module.exports = router