"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _mysql = _interopRequireDefault(require("mysql"));
var _bodyParser = _interopRequireWildcard(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = require("express").Router();
module.exports = router;
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
var baglanti = _mysql["default"].createConnection({
  host: "localhost",
  user: "root",
  password: "15935738a",
  database: "ingilizce_uygulamasi"
});
baglanti.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connection Successful");
  }
});
router.post("/kullaniciKayitOlma", function (req, res) {
  var kullaniciAdi = req.body.kullaniciAdi;
  var sifre = req.body.sifre;
  baglanti.query("SELECT kullaniciAdi FROM kullanici", function (err, result) {
    var kullaniciAdiString = JSON.parse(JSON.stringify(result));
    if (err) {
      throw err;
    } else {
      for (var i = 0; i < kullaniciAdiString.length; i++) {
        if (kullaniciAdiString[i].kullaniciAdi == kullaniciAdi) {
          //boolean olanı yapcan buraya 
          res.send("eklenmedi");
        } else {
          baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre) values (?,?)", [kullaniciAdi, sifre], function (err) {
            if (err) throw err;
            res.send("eklendi");
          });
        }
      }
    }
  });
});
router.put("/meslekDilSecimi", function (req, res) {
  var kullaniciAdi = req.body.kullaniciAdi;
  var meslek = req.body.meslek;
  var dil = req.body.dil;
  var sectigiDil = req.body.sectigiDil;
  baglanti.query("SELECT * FROM kullanici", function (err, result) {
    var kullaniciAdiString = JSON.parse(JSON.stringify(result));
    if (err) {
      throw err;
    } else {
      for (var i = 0; i < kullaniciAdiString.length; i++) {
        if (kullaniciAdiString[i].kullaniciAdi == kullaniciAdi) {
          baglanti.query("SELECT * FROM meslek", function (err, result) {
            if (err) {
              throw err;
            } else {
              var meslekIdString = JSON.parse(JSON.stringify(result));
              for (var i = 0; i < meslekIdString.length; i++) {
                console.log(meslekIdString[0].Meslek);
                if (meslek == meslekIdString[i].Meslek) {
                  var idJop = meslekIdString[i].idMeslek;
                  baglanti.query("UPDATE kullanici SET MeslekID = ? WHERE kullaniciAdi = ?", [idJop, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    } else {
                      res.send("Guncellendi");
                    }
                  });
                }
                /* else{
                    res.send("Böyle bir meslek bulunamadi")
                } */
              }
            }
          });
        }

        if (kullaniciAdiString[i].kullaniciAdi == kullaniciAdi) {
          baglanti.query("SELECT * FROM dil", function (err, result) {
            if (err) {
              throw err;
            } else {
              var dilIdString = JSON.parse(JSON.stringify(result));
              for (var i = 0; i < dilIdString.length; i++) {
                if (dil == dilIdString[i].Dil) {
                  console.log(dilIdString[i].Dil);
                  var idDil = dilIdString[i].idDil;
                  baglanti.query("UPDATE kullanici SET DilID = ? WHERE kullaniciAdi = ?", [idDil, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
            }
          });
        }
        if (kullaniciAdiString[i].kullaniciAdi == kullaniciAdi) {
          baglanti.query("SELECT * FROM dil", function (err, result) {
            if (err) {
              throw err;
            } else {
              var SectigidilIdString = JSON.parse(JSON.stringify(result));
              for (var i = 0; i < SectigidilIdString.length; i++) {
                if (sectigiDil == SectigidilIdString[i].Dil) {
                  console.log(SectigidilIdString[i].Dil);
                  var idDil = SectigidilIdString[i].idDil;
                  baglanti.query("UPDATE kullanici SET SectigiDilID = ? WHERE kullaniciAdi = ?", [idDil, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
            }
          });
        }
      }
    }
  });
});