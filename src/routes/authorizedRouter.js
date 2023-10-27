const router = require("express").Router();//routerları export etmek için   
import mysql from "mysql" //sql bağlantısı kurmak için
import express from "express";
import util from "util"
import { error } from "console";
import authMiddleware from "../middlewares/auth.js"

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


async function languageFind(language){
    var result = await query("Select COUNT(*) as sayi FROM dil WHERE dil_adi = ?",language);
    
    if(result[0].sayi==1){
        return true
    }
    else{
        return false
    }
}

async function jobFind(meslek){
    var result = await query("Select COUNT(*) as sayi FROM meslek WHERE meslek = ?",meslek);
    
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


router.get("/language",authMiddleware,(req,res)=>{
    con.query("SELECT * FROM dil",(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})

router.get("/language/:id",authMiddleware,(req,res)=>{
    const id = req.params.id

    con.query("SELECT * FROM dil where id = ? ",id,(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})

router.post("/language",authMiddleware,async(req,res)=>{
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

router.delete("/language",authMiddleware,async(req,res)=>{
    const dil = req.body.dil
    const isLanguageExist = await languageFind(dil)

    if(isLanguageExist == true){
        con.query("DELETE FROM dil WHERE dil_adi = ? ",dil,(err)=>{
            if(err){
                throw err
            }
            res.send("Basarili bir sekilde silindi")
        })
    }else{
        res.send("Böyle bir dil bulunamadi")
    }
})

router.get("/job",authMiddleware,(req,res)=>{
    con.query("SELECT * FROM meslek",(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.get("/job/:id",authMiddleware,(req,res)=>{
    const id = req.params.id
    con.query("SELECT * FROM meslek where idMeslek = ?",id,(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.post("/job",authMiddleware,async(req,res)=>{
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

router.delete("/job",authMiddleware,async(req,res)=>{
    const meslek = req.body.meslek
    const isJobExist = await jobFind(meslek)

    if(isJobExist == true){
        con.query("DELETE FROM meslek WHERE meslek = ? ",meslek,(err)=>{
            if(err){
                throw err
            }
            res.send("Basarili bir sekilde silindi")
        })
    }else{
        res.send("Böyle bir meslek bulunamadi")
    } 
})

router.get("/word",authMiddleware,(req,res)=>{
    con.query("SELECT * FROM kelime",(err,result)=>{
        res.send(result)
    })
})

router.get("/word/:id",authMiddleware,(req,res)=>{
    const id = req.params.id;

    con.query("SELECT * FROM kelime Where id = ?",id,(err,result)=>{
        res.send(result)
    })
})

router.post("/word",authMiddleware,async(req,res)=>{
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

router.delete("/word",authMiddleware,async(req,res)=>{
    const kelime = req.body.kelime
    const isWordExist = await wordFind(kelime)

    if(isWordExist == true){
        con.query("DELETE FROM kelime WHERE kelime = ? ",kelime,(err)=>{
            if(err){
                throw err
            }
            res.send("Basarili bir sekilde silindi")
        })
    }else{
        res.send("Böyle bir kelime bulunamadi")
    }
})

router.get("/category",authMiddleware,(req,res)=>{
    con.query("SELECT * FROM kategori",(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.get("/category/:id",authMiddleware,(req,res)=>{
    const id = req.params.id
    
    con.query("SELECT * FROM kategori WHERE id = ?",id,(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.post("/category",authMiddleware,(req,res)=>{
    const kategori = req.body.kategori
    const meslek_id = req.body.meslek_id

    con.query("INSERT INTO kategori (kategori,meslek_id) values (?,?)",[kategori,meslek_id],(err,result)=>{
        if(err){
            throw err
        }
        res.send("Kategori eklendi")
    })
})

router.delete("/category",authMiddleware,(req,res)=>{
    const id = req.body.id

    con.query("DELETE FROM kategori WHERE id = ? ",id,(err)=>{
        if(err){
            throw err
        }
        res.send("Basarili bir sekilde silindi")
    })
})


module.exports = router