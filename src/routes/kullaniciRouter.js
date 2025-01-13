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

router.post("/signin", async (req, res) => {
    var con = getDb.getConnection();

    const kullaniciAdi = req.body.kullaniciAdi;
    const sifre = req.body.sifre
    //react native'de get metodu gönderirken params ile göndercez burdan query metodu olarak alabiliz 
    var passwordToken = md5(sifre)

    var getUserInfo = userModel.user  //user modelden import ediyoruz ve ordan fonk çağrıyoruz
    var userInfo = new getUserInfo(kullaniciAdi)

    var isUserExist = await userInfo.userFind(kullaniciAdi)
    var user = await userInfo.userInfo(kullaniciAdi)


    if (isUserExist == true) {
        if (passwordToken == user[0].şifre) {

            const accessToken = jwt.sign({ id: user[0].id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" })

            const refreshToken = jwt.sign({ id: user[0].id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "60m" })
            con.query("UPDATE kullanici SET accesToken = ? , refreshToken = ? WHERE kullaniciAdi = ? ", [accessToken, refreshToken, kullaniciAdi])
            res.json({ message: "Basarili bir sekilde giris yaptiniz", accessToken: accessToken, refreshToken: refreshToken, status: "SUCCES", id: user[0].id })
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

router.get("/forgetPasswordCode", async (req, res) => {
    var con = getDb.getConnection();

    const email = req.query.email;

    if (!email) {
        return res.json({
            status: "FAILED",
            message: "Email adresi gereklidir"
        });
    }

    function codeUret(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const code = codeUret(1000, 9999).toString(); // 4 haneli bir kod üretir
    //var codeToken = md5(code)

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
    await transporter.sendMail({
        from: '"You" <kavalcinurihan@gmail.com>',
        to: email,
        subject: "ŞİFREMİ UNUTTUM KODU",
        html: code,
    })

    con.query("UPDATE kullanici SET forgetPasswordToken = ? WHERE email= ? ", [code, email], (err) => {
        if (err) {
            throw err
        }
        res.json({
            status: "SUCCESS",
            message: "Şifre sıfırlama kodu email adresinize gönderildi",
        });
    })
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

router.get("/meslek", (req, res) => {
    var con = getDb.getConnection()

    con.query("SELECT * FROM meslek", (err, result) => {

        res.json({ result })
    })


})

router.post("/meslekSecim", (req, res) => {

    const meslek = req.body.meslek
    const id = req.body.id
    var con = getDb.getConnection()



    con.query("UPDATE kullanici SET MeslekID = ? WHERE id = ? ", [meslek, id], (err, result) => {
        if (err) {
            throw err
        }

        res.json({ STATUS: "SUCCES" })

    })
})

router.get("/dil", (req, res) => {

    var con = getDb.getConnection()

    con.query("SELECT * FROM dil", (err, result) => {
        res.json({ result })
    })
})

router.post("/dilSecim", (req, res) => {
    const dil = req.body.dil
    const id = req.body.id
    var con = getDb.getConnection()

    con.query("UPDATE kullanici SET DilID = ? WHERE id = ? ", [dil, id], (err, result) => {
        if (err) {
            throw err
        }
        res.json({ STATUS: "SUCCES" })

    })
})


router.post("/sectigiDilSecim", (req, res) => {
    const sectigiDil = req.body.sectigiDil
    const id = req.body.id
    var con = getDb.getConnection()

    con.query("UPDATE kullanici SET SectigiDilID = ? WHERE id = ? ", [sectigiDil, id], (err, result) => {
        if (err) {
            throw err
        }

        res.json({ STATUS: "SUCCES" })

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

router.post("/DilSeviyesi", (req, res) => {
    var con = getDb.getConnection()

    const dilSeviyesi = req.body.sectigiDil
    const id = req.body.id

    con.query("Update kullanici SET dilSeviyesi = ? WHERE id = ?", [dilSeviyesi, id], (err, result) => {
        if (err) throw err

        res.json({
            status: "SUCCES"
        })
    })
})

router.post("/NedenOgreniyor", (req, res) => {
    var con = getDb.getConnection()

    const nedenOgreniyor = req.body.nedenOgreniyor
    const id = req.body.id

    con.query("Update kullanici SET nedenOgreniyor = ? WHERE id = ?", [nedenOgreniyor, id], (err, result) => {
        if (err) throw err

        res.json({
            status: "SUCCES"
        })
    })
})

router.get("/Kullanici", (req, res) => {
    var id = req.query.id
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    var con = getDb.getConnection();

    con.query("SELECT * FROM kullanici WHERE id = ?", [id], (err, result) => {
        if (err) {
            throw err
        }

        res.json(result)
    })

})

router.get("/KullaniciBilgileri", userMiddleware, function (req, res) {

    var id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    var con = getDb.getConnection();
    var kullaniciAdi = null;
    var email = null;
    var meslek = null;
    var dil = null;
    var OgrenilecekDil = null;
    var user = [{
        id: id,
        kullaniciAdi: kullaniciAdi,
        email: email,
        meslek: meslek,
        dil: dil,
        OgrenilecekDil: OgrenilecekDil
    }];

    con.query("SELECT kullaniciAdi, meslek, email FROM kullanici INNER JOIN meslek ON kullanici.MeslekID = meslek.idMeslek WHERE kullanici.id = ?", [id], function (err, result) {
        if (err) {

            return res.status(500).json({ error: "Database query failed" });

        }
        if (result.length === 0) {

            return res.status(404).json({ error: "User not found" });
        }

        user[0].meslek = result[0].meslek;
        user[0].kullaniciAdi = result[0].kullaniciAdi;
        user[0].email = result[0].email;

        con.query("SELECT LocalName FROM kullanici INNER JOIN dil ON kullanici.DilID = dil.DilID WHERE kullanici.id = ?", [id], function (err, result) {
            if (err) {
                return res.status(500).json({ error: "Database query failedd" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "Language not found" });
            }

            user[0].dil = result[0].LocalName;

            con.query("SELECT LocalName FROM kullanici INNER JOIN dil ON kullanici.SectigiDilID = dil.DilID WHERE kullanici.id = ?", [id], function (err, result) {
                if (err) {
                    return res.status(500).json({ error: "Database query faileddd" });
                }
                if (result.length === 0) {
                    return res.status(404).json({ error: "Selected language not found" });
                }
                user[0].OgrenilecekDil = result[0].LocalName;
                res.json({ user: user });
            });
        });
    });
});

router.put("/NewAccessToken", async (req, res) => {
    const con = await getDb.getConnection(); // Bağlantıyı al
    const id = req.body.id; // ID'yi query parametrelerinden al
    const refreshToken = req.body.refreshToken; // Refresh token'ı query parametrelerinden al

    try {
        // Kullanıcının refresh token'ını kontrol et
        con.query("SELECT * FROM kullanici WHERE id = ?", [id], async (err, result) => {
            if (err) {
                console.error("Veritabanı sorgu hatası:", err);
                return res.status(500).json({ message: "Veritabanı hatası" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Kullanıcı bulunamadı" });
            }

            const DbRefreshToken = result[0].refreshToken;
            // Refresh token'ı kontrol et 
            if (!DbRefreshToken || DbRefreshToken !== refreshToken) {
                return res.status(403).json({ message: "Geçersiz refresh token" });
            }

            // Refresh token'ın süresini kontrol et
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
                if (err) {
                    return res.status(403).json({ message: "Refresh token süresi dolmuş veya geçersiz" });
                }

                // Yeni access token oluştur
                const accessToken = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });

                // Yeni access token'ı veritabanında güncelle
                con.query("UPDATE kullanici SET accesToken = ? WHERE id = ?", [accessToken, id], (err) => {
                    if (err) {
                        console.error("Veritabanı güncelleme hatası:", err);
                        return res.status(500).json({ message: "Veritabanı hatası" });
                    }

                    res.json({ accessToken: accessToken });
                });
            });
        });
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});




router.get("/Seviye", (req, res) => { //seviye sezon bölüm bunları order'ına göre sıralama yapsın
    var con = getDb.getConnection()

    con.query("SELECT * FROM seviye ORDER BY seviye.Order", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

router.get("/Sezon", (req, res) => {
    const SeviyeID = req.query.SeviyeID
    const HangiDilID = req.query.HangiDilID
    var con = getDb.getConnection();

    con.query("SELECT ceviriler.Ceviri, SezonID ,sezon.Order FROM sezon INNER JOIN ceviriler ON sezon.CeviriID = ceviriler.CevirilerID where sezon.SeviyeID = ? AND ceviriler.HangiDilID = ? ORDER BY sezon.Order;", [SeviyeID, HangiDilID], (err, result) => {
        if (err) {
            throw err
        }

        res.json(result)
    })
})

router.get("/Bolum", (req, res) => {
    const SezonID = req.query.SezonID
    const HangiDilID = req.query.HangiDilID
    var con = getDb.getConnection();

    con.query("SELECT BolumID, ceviriler.Ceviri,bolum.Order  FROM bolum INNER JOIN ceviriler ON bolum.CeviriID = ceviriler.CevirilerID WHERE bolum.SezonID = ? AND ceviriler.HangiDilID = ? ORDER BY bolum.Order;", [SezonID, HangiDilID], (err, result) => {
        if (err) {
            throw err
        }

        res.json(result)
    })
})

router.get("/Oyun", (req, res) => {
    const BolumID = req.query.BolumID

    var con = getDb.getConnection();

    con.query("SELECT anakelimeler.AnaKelimelerID , ceviriler.AnaKelimeID , anakelimeler.value , ceviriler.ceviri FROM anakelimeler INNER JOIN ceviriler ON anakelimeler.AnaKelimelerID = ceviriler.AnaKelimeID WHERE anakelimeler.BolumID = ? AND anakelimeler.test = 1", [BolumID], (err, result) => {
        if (err) {
            throw err
        }

        res.json(result)
    })
})

router.get("/Egitim", (req, res) => {  //eğitimde bir de kullanıcının meslek diline göre diline göre getirmeyi de kontoırl et
    const SeviyeID = req.query.SeviyeID

    var con = getDb.getConnection();

    con.query(" SELECT ak.AnaKelimelerID , ak.Value , c.Ceviri FROM anakelimeler ak JOIN bolum b ON ak.BolumID = b.BolumID JOIN sezon s ON b.SezonID = s.SezonID JOIN ceviriler c ON ak.AnaKelimelerID = c.AnakelimeID WHERE ak.test = 1 AND s.SeviyeID = ?", [SeviyeID], (err, result) => {
        if (err) {
            throw err
        }

        res.json(result)
    })
})
router.post("/SozlugeKelimeEkleme", (req, res) => {
    var con = getDb.getConnection()

    const KullaniciID = req.body.KullaniciID;
    const AnaKelimeID = req.body.AnaKelimeID

    con.query("SELECT COUNT(*) AS count FROM sozluk WHERE kullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, AnaKelimeID], (err, result) => {
        if (err) throw err;

        // 'count' sütun adıyla sonuç al
        const count = result[0].count;

        if (count > 0) {
            res.json({ message: "Bu Kelime Zaten Sözlüğünde Var" });
        } else {
            con.query("INSERT INTO sozluk (KullaniciID, AnaKelimeID) VALUES (?, ?)", [KullaniciID, AnaKelimeID], (err, result) => {
                if (err) throw err;
                res.json({ message: "Başarıyla Eklendi" });
            });
        }
    });

})

router.delete("/SozluktenKelimeSilme", (req, res) => {
    const KullaniciID = req.query.KullaniciID;
    const KelimeID = req.query.KelimeID;

    con.query("DELETE FROM sozluk WHERE KullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, KelimeID], (err, result) => {
        if (err) {
            // Hata durumunda hata mesajını geri döndür
            return res.status(500).json({ error: "Veritabanı hatası" });
        }

        // Etkilenen satır sayısını kontrol et
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Kelime bulunamadı veya zaten silinmiş" });
        }

        // Silme işlemi başarılıysa
        res.json({ message: "Kelime başarıyla silindi" });
    });
});

router.get("/SozluguGetir", (req, res) => {
    var con = getDb.getConnection()

    const KullaniciID = req.query.KullaniciID

    con.query("SELECT sozluk.SozlukID,anakelimeler.AnaKelimelerID, anakelimeler.Value,ceviriler.Ceviri FROM sozluk INNER JOIN anakelimeler ON sozluk.AnaKelimeID = anakelimeler.AnaKelimelerID INNER JOIN ceviriler ON ceviriler.AnaKelimeID = anakelimeler.AnaKelimelerID WHERE sozluk.KullaniciID = ?", [KullaniciID], (err, result) => {
        if (err) throw err

        res.json({ message: result })
    })
})
router.get("/SozlugeEkliMi", (req, res) => {
    var con = getDb.getConnection()

    const KullaniciID = req.query.KullaniciID
    const KelimeID = req.query.KelimeID
    con.query("SELECT COUNT(*) AS count FROM sozluk WHERE KullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, KelimeID], (err, result) => {
        const count = result[0].count;
        if (err) throw err

        if (count > 0) {
            res.json(true)
        } else {
            res.json(false)
        }
    })
})

router.post("/GecilenBolumlerEkle", function (req, res) {
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var BolumID = req.body.BolumID;
    con.query("SELECT COUNT(*) AS count FROM gecilenbolumler WHERE KullaniciID=? AND BolumID=?", [KullaniciID, BolumID], function (err, result) {
        if (result[0].count > 0) {
            res.json({
                message: "failed"
            });
        } else {
            con.query("INSERT INTO gecilenbolumler (KullaniciID,BolumID) VALUES (?,?)", [KullaniciID, BolumID], function (err, result) {
                if (err) throw err;
                res.json({
                    message: "succes"
                });
            });
        }
    });
});

router.get("/GecilenBolumler", (req, res) => {
    var con = getDb.getConnection()

    const KullaniciID = req.query.KullaniciID
    const SezonID = req.query.SezonID

    con.query("SELECT * FROM bolum INNER JOIN gecilenbolumler ON bolum.BolumID = gecilenbolumler.BolumID WHERE bolum.SezonID = ? AND gecilenbolumler.KullaniciID = ? ORDER BY bolum.Order", [SezonID, KullaniciID], (err, result) => {
        if (err) throw err;

        res.json({ message: result })
    })
})

router.post("/GecilenSezonEkle", function (req, res) {
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var SezonID = req.body.SezonID;
    con.query("SELECT COUNT(*) AS count FROM gecilensezonlar WHERE KullaniciID=? AND SezonID=?", [KullaniciID, SezonID], function (err, result) {
        if (result[0].count > 0) {
            res.json({
                message: "failed"
            });
        } else {
            con.query("INSERT INTO gecilensezonlar (KullaniciID,SezonID) VALUES (?,?)", [KullaniciID, SezonID], function (err, result) {
                if (err) throw err;
                res.json({
                    message: "succes"
                });
            });
        }
    });
});

router.get("/GecilenSezonlar", (req, res) => {
    var con = getDb.getConnection()

    const KullaniciID = req.query.KullaniciID
    const SeviyeID = req.query.SeviyeID

    con.query("SELECT * FROM gecilensezonlar INNER JOIN sezon ON gecilensezonlar.SezonID = sezon.SezonID WHERE sezon.SeviyeID = ? AND gecilensezonlar.KullaniciID = ?", [SeviyeID, KullaniciID], (err, result) => {
        if (err) throw err;

        res.json({ message: result })
    })
})
router.get("/SezonBittiMiKontrol", (req, res) => {
    const con = getDb.getConnection();

    const KullaniciID = req.query.KullaniciID;
    const SezonID = req.query.SezonID;

    // SezonID ile bölümleri al
    con.query("SELECT * FROM bolum WHERE SezonID = ?", [SezonID], (err, bolumlerResult) => {
        if (err) {
            return res.status(500).json({ message: "Bölümleri alırken hata oluştu." });
        }

        // Geçilen bölümleri al
        con.query("SELECT * FROM gecilenbolumler WHERE KullaniciID = ?", [KullaniciID], (err, gecilenBolumlerResult) => {
            if (err) {
                return res.status(500).json({ message: "Geçilen bölümleri alırken hata oluştu." });
            }

            // Geçilen bölüm ID'lerini diziye çevir
            const gecilenBolumIDs = gecilenBolumlerResult.map(bolum => bolum.BolumID);

            // Sezondaki tüm bölümlerin ID'lerini al
            const bolumIDs = bolumlerResult.map(bolum => bolum.BolumID);

            // Tüm bölümler geçilmişse true döndür
            const sezonBittiMi = bolumIDs.every(bolumID => gecilenBolumIDs.includes(bolumID));

            res.json({ sezonBittiMi });
        });
    });
});

router.post("/GunlukGiris", function (req, res) {
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var Date = req.body.Date;

    con.query("SELECT COUNT(*) as count FROM gunlukgiris WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Date], (err, result) => {
        if (err) {
            console.error("Hata:", err);
            return res.status(500).json({ error: "Veritabanı hatası." });
        }

        if (result[0].count > 0) {
            res.json(false)
        }
        else {
            con.query("INSERT INTO gunlukgiris (KullaniciID,Tarih) VALUES (?,?)", [KullaniciID, Date], function (err, result) {
                if (err) {
                    console.error("Hata:", err);
                    return res.status(500).json({ error: "Veritabanı hatası." });
                }

                return res.json(true);  // Yeni giriş başarılı
            });
        }
    })
});
router.get("/GunlukGiris", function (req, res) {
    var con = getDb.getConnection();
    var KullaniciID = req.query.KullaniciID;

    console.log(KullaniciID)
    con.query("SELECT * FROM gunlukgiris WHERE KullaniciID = ?", [KullaniciID], (err, result) => {
        if (err) {
            console.error("Hata:", err);
            return res.status(500).json({ error: "Veritabanı hatası." });
        }
        res.json({ message: result })
    })
});
router.post("/GunlukSozlugeGiris", function (req, res) {
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var Date = req.body.Date;
    var SozlugeGiris = req.body.SozlugeGiris;

    con.query("SELECT COUNT(*) as count FROM gunlukgiris WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Veritabanı hatası burda." });
        }
        if (result[0].count > 0) {
            con.query("UPDATE gunlukgiris SET SozlukGiris = ? WHERE KullaniciID = ? AND Tarih = ?", [SozlugeGiris, KullaniciID, Date], function (err, result) {
                if (err) {
                    return res.status(500).json({ error: "Veritabanı hatası. şurda" });
                }
                return res.json(true);
            });
        }
        else {
            res.json(false)
        }
    })
});
module.exports = router