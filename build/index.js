"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _kullaniciRouter = _interopRequireDefault(require("./routes/kullaniciRouter.js"));
var _authorizedRouter = _interopRequireDefault(require("./routes/authorizedRouter.js"));
var _os = require("os");
var _auth = _interopRequireDefault(require("./middlewares/auth.js"));
require('dotenv').config(); //tokenlerin gözükmesi için yazdık bunu

var jwt = require("jsonwebtoken"); //token oluşturmak için
var crypto = require("crypto");
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); //verileri json formatına çeviriyor  

app.listen(3000, function (err) {
  if (err) {
    console.log("hata verdi");
  }
});
app.use("/kullanici", _kullaniciRouter["default"]);
app.use("/authorized", _authorizedRouter["default"]);
var user = {
  kullaniciAdi: "nuri",
  sifre: "12356"
};
var animalArray = [{
  name: "lion"
}, {
  name: "turtle"
}, {
  name: "horse"
}];
app.get("/animal", _auth["default"], function (req, res) {
  console.log(req.user);
  res.json(animalArray);
});
app.post("/login", function (req, res) {
  var kullaniciAdi = req.body.kullaniciAdi;
  var sifre = req.body.sifre;
  if (kullaniciAdi !== user.kullaniciAdi || user.sifre !== sifre) {
    res.send("Yanliş bilgi");
  } else {
    var accesToken = jwt.sign({
      kullaniciAdi: user.kullaniciAdi,
      sifre: user.sifre
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m"
    }); //saklamak istediklerimiz ,sonra imza,sonra süre(15dk)

    var refreshToken = jwt.sign({
      kullaniciAdi: user.kullaniciAdi,
      sifre: user.sifre
    }, process.env.REFRESH_TOKEN_SECRET); //saklamak istediklerimiz ,sonra imza,sonra süre(refresh tokeni sınırsız yaptık)

    return res.status(200).json({
      accesToken: accesToken,
      refreshToken: refreshToken
    });
  }
});

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