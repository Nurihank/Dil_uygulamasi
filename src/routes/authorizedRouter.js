const router = require("express").Router();//routerları export etmek için   
import util from "util"
import { error } from "console";
import authMiddleware from "../middlewares/auth.js"

var db = require("../model/database")
var getDb = new db();
getDb.connect()

async function languageFind(language){
    var con = getDb.getConnection();
    const query = util.promisify(con.query).bind(con);

    var result = await query("Select COUNT(*) as sayi FROM dil WHERE dil_adi = ?",language);
    
    if(result[0].sayi==1){
        return true
    }
    else{
        return false
    }
}

async function jobFind(meslek){
    var con = getDb.getConnection();
    const query = util.promisify(con.query).bind(con);

    var result = await query("Select COUNT(*) as sayi FROM meslek WHERE meslek = ?",meslek);
    
    if(result[0].sayi==1){
        return true
    }
    else{
        return false
    }
}

async function wordFind(word){
    var con = getDb.getConnection();
    const query = util.promisify(con.query).bind(con);
    
    var result = await query("SELECT COUNT(*) as sayi FROM kelime WHERE kelime = ?",word)
    if(result[0].sayi){
        return true
    }else{
        return false
    }
}


router.get("/language",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    
    
    con.query("SELECT * FROM dil",(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})

router.get("/language/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    
    
    const id = req.params.id

    con.query("SELECT * FROM dil where id = ? ",id,(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})

router.put("/language/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const id = req.params.id
    const dilAdi = req.body.dilAdi;

    if(dilAdi != null){
        con.query("UPDATE dil SET dil_adi = ? WHERE id = ?",[dilAdi,id],(err,result)=>{
            if(err) throw err
    
            res.send("Başarıyla güncellendi")
        })
    }
    else{
        res.send("Dil giriniz")
    }
    
})
router.post("/language",authMiddleware,async(req,res)=>{
    var con = getDb.getConnection();
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
    var con = getDb.getConnection();
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
    var con = getDb.getConnection();
    con.query("SELECT * FROM meslek",(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.get("/job/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const id = req.params.id
    con.query("SELECT * FROM meslek where idMeslek = ?",id,(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.put("/job/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const id = req.params.id
    const job = req.body.job

    if(job != null){
        con.query("UPDATE meslek SET meslek = ? WHERE idMeslek = ?",[job,id],(err,result)=>{
            if(err) throw err
    
            res.send("Başarıyla güncellendi")
        })
    }
    else{
        res.send("Meslek giriniz")
    }
    
})

router.post("/job",authMiddleware,async(req,res)=>{
    var con = getDb.getConnection();
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
    var con = getDb.getConnection();
    const job = req.body.job
    const isJobExist = await jobFind(job)

    if(isJobExist == true){
        con.query("DELETE FROM meslek WHERE meslek = ? ",job,(err)=>{
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
    var con = getDb.getConnection();
    con.query("SELECT * FROM kelime",(err,result)=>{
        res.send(result)
    })
})

router.get("/word/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const id = req.params.id;

    con.query("SELECT * FROM kelime Where id = ?",id,(err,result)=>{
        res.send(result)
    })
})

router.put("/word/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const id = req.params.id;
    const kategori_id = req.body.kategori_id
    const kelime = req.body.kelime

    if(kategori_id != null && kelime != null ){
        con.query("UPDATE kelime SET kategori_id = ? , kelime = ? WHERE id = ?",[kategori_id,kelime,id],(err,result)=>{
            if(err) throw err
    
            res.send("Başarıyla güncellendi")
        })
    }
    else{
        res.send("kategori_id veya kelime boş kalamaz")
    }
    
})

router.post("/word",authMiddleware,async(req,res)=>{
    var con = getDb.getConnection();
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
    var con = getDb.getConnection();
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
    var con = getDb.getConnection();
    con.query("SELECT * FROM kategori",(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.get("/category/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const id = req.params.id
    
    con.query("SELECT * FROM kategori WHERE id = ?",id,(err,result)=>{
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
})

router.put("/category/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const id = req.params.id
    const kategori = req.body.kategori
    const meslek_id = req.body.meslek_id

    if(kategori != null && meslek_id != null){
        con.query("UPDATE kategori SET kategori = ? , meslek_id = ? WHERE id = ? ",[kategori,meslek_id,id],(err,result)=>{
            if(err) throw err

            res.send("Başarıyla güncellendi")
        })
    }   
    else{
        res.send("Kategori veya meslek_id boş kalamaz")
    }
})

router.post("/category",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();
    const kategori = req.body.kategori
    const meslek_id = req.body.meslek_id

    con.query("INSERT INTO kategori (kategori,meslek_id) values (?,?)",[kategori,meslek_id],(err,result)=>{
        if(err){
            throw err
        }
        res.send("Kategori eklendi")
    })
})

router.delete("/category/:id",authMiddleware,(req,res)=>{
    var con = getDb.getConnection();

    const id = req.params.id

    con.query("DELETE FROM kategori WHERE id = ? ",id,(err)=>{
        if(err){
            throw err
        }
        res.send("Basarili bir sekilde silindi")
    })
})

router.get("/user",(req,res)=>{
    var con = getDb.getConnection()

    con.query("SELECT * FROM kullanici",(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
})
router.get("/user/:id",(req,res)=>{
    const id = req.params.id
    var con = getDb.getConnection()
    consoleç
    con.query("SELECT * FROM kullanici WHERE id = ?",[id],(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })

})



module.exports = router