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
    console.log(sayiString[0].sayi)
    if (sayiString[0].sayi > 0) {
        return false
    }
    else {
        return true
    }
}

router.post("/signup", async (req, res) => {
    var con = getDb.getConnection();
    const kullaniciAdi = req.body.kullaniciAdi
    const eposta = req.body.eposta;
    const sifre = req.body.sifre

    var getUserInfo = userModel.user
    var userInfo = new getUserInfo(kullaniciAdi)

    try {
        const isUserExist = await userInfo.userFind(kullaniciAdi);
        const isEmailExist = await userEmail(eposta);

        console.log(isUserExist)
        console.log(isEmailExist)

        if (!isUserExist || !isEmailExist) { // Eğer herhangi biri veya ikisi de false ise
            return res.status(400).json({
                status: "FAILED",
                message: "Girdiğiniz bilgilerle kayıt oluşturulamıyor."
            });
        }


        var passwordToken = md5(sifre)

        con.query("INSERT INTO kullanici (kullaniciAdi, şifre, email) values (?, ?, ?)", [kullaniciAdi, passwordToken, eposta], (err, result) => {
            if (err) throw err;

            res.json({
                status: "SUCCESS",
                message: "Başarılı bir şekilde kayıt oldunuz.",
                userId: result.insertId  // Eklenen kullanıcının ID'sini döndür
            });
        });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: "Bir hata oluştu." });
    }
})

router.post("/signin", async (req, res) => {
    var con = getDb.getConnection();

    const eposta = req.body.eposta;
    const sifre = req.body.sifre
    //react native'de get metodu gönderirken params ile göndercez burdan query metodu olarak alabiliz 
    var passwordToken = md5(sifre)

    if (eposta && sifre) {
        // Kullanıcıyı kontrol eden SELECT sorgusu
        con.query(
            "SELECT * FROM kullanici WHERE email = ? AND şifre = ?",
            [eposta, passwordToken],
            (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: "FAILED",
                        message: "Sunucu hatası meydana geldi"
                    });
                } else if (result.length > 0) { /* kullanıcı giriş yaptı */
                    const accessToken = jwt.sign({ id: result[0].id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "30m" })

                    const refreshToken = jwt.sign({ id: result[0].id },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: "60m" })
                    con.query("UPDATE kullanici SET accesToken = ? , refreshToken = ? WHERE id = ? ", [accessToken, refreshToken, result[0].id])

                    res.json({
                        message: "Basarili bir sekilde giris yaptiniz",
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        status: "SUCCES",
                        id: result[0].id
                    })

                } else {
                    // Kullanıcı bulunamadı
                    res.json({
                        status: "FAILED",
                        message: "E-posta veya şifre hatalı"
                    });
                }
            }
        );
    } else {
        // E-posta veya şifre eksik
        res.json({
            status: "FAILED",
            message: "E-posta ve şifre gerekli"
        });
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

router.get("/KullaniciBilgileri", userMiddleware, function (req, res) { /* bu apiyi sor */

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
                    console.log("Yeni accestoken oluşturuldu")
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

//oyunun sorgusunu düzlet
router.get("/Oyun", (req, res) => {
    const BolumID = req.query.BolumID

    var con = getDb.getConnection();

    con.query("SELECT anakelimeler.AnaKelimelerID , ceviriler.AnaKelimeID , anakelimeler.value , ceviriler.ceviri FROM anakelimeler INNER JOIN ceviriler ON anakelimeler.AnaKelimelerID = ceviriler.AnaKelimeID WHERE anakelimeler.BolumID = ? AND anakelimeler.test = 1 ", [BolumID], (err, result) => {
        if (err) {
            throw err
        }

        res.json(result)
    })
})

router.get("/Egitim", (req, res) => {  
    var con = getDb.getConnection();

    const SeviyeID = req.query.SeviyeID
    const MeslekID = req.query.MeslekID
    const AnaDilID = req.query.AnaDilID
    const HangiDilID = req.query.HangiDilID

    con.query("SELECT ak.AnaKelimelerID , ak.Value , c.Ceviri FROM seviye s INNER JOIN  sezon sz ON s.SeviyeID = sz.SeviyeID INNER JOIN bolum b ON b.SezonID = sz.SezonID INNER JOIN  anakelimeler ak ON ak.BolumID = b.BolumID INNER JOIN ceviriler c ON ak.AnaKelimelerID = c.AnaKelimeID  WHERE ak.MeslekID = ? AND c.AnaDilID = ? AND c.HangiDilID = ? AND s.SeviyeID = ? AND ak.test = 1;", [MeslekID,AnaDilID,HangiDilID,SeviyeID], (err, result) => {
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
    var Date = req.body.Date;
    console.log(Date)

    con.query("SELECT COUNT(*) AS count FROM sozluk WHERE kullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, AnaKelimeID], (err, result) => {
        if (err) throw err;

        // 'count' sütun adıyla sonuç al
        const count = result[0].count;

        if (count > 0) {
            res.json({ message: "Bu Kelime Zaten Sözlüğünde Var" });
        } else {
            con.query("INSERT INTO sozluk (KullaniciID, AnaKelimeID,Tarih) VALUES (?, ?,?)", [KullaniciID, AnaKelimeID, Date], (err, result) => {
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

router.post("/OynananOyun", function (req, res) {
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var BolumID = req.body.BolumID;
    var Tarih = req.body.Date
    var GectiMi = req.body.GectiMi
    con.query("SELECT COUNT(*) AS count FROM oynananbolumler WHERE KullaniciID=? AND BolumID=?", [KullaniciID, BolumID], function (err, result) {
        if (result[0].count > 0) {


            con.query("SELECT GectiMi FROM oynananbolumler WHERE KullaniciID = ? AND BolumID = ?", [KullaniciID, BolumID], (err, result) => {
                if (err) { throw err }

                console.log(result[0].GectiMi)
                if (result[0].GectiMi) {
                    res.json({
                        message: "Zaten Bu Bölümü Geçmiş"
                    });
                } else {
                    con.query("UPDATE oynananbolumler SET GectiMi = ? , Tarih = ? WHERE KullaniciID = ? AND BolumID = ?", [GectiMi, Tarih, KullaniciID, BolumID], (err, result) => {
                        res.json({
                            message: "succes"
                        });
                    })
                }
            })
        } else {
            con.query("INSERT INTO oynananbolumler (KullaniciID,BolumID,Tarih,GectiMi) VALUES (?,?,?,?)", [KullaniciID, BolumID, Tarih, GectiMi], function (err, result) {
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

    con.query("SELECT * FROM bolum INNER JOIN oynananbolumler ON bolum.BolumID = oynananbolumler.BolumID WHERE bolum.SezonID = ? AND oynananbolumler.KullaniciID = ? AND oynananbolumler.GectiMi = 1 ORDER BY bolum.Order", [SezonID, KullaniciID], (err, result) => {
        if (err) throw err;

        res.json({ message: result })
    })
})

router.post("/GecilenSezonEkle", function (req, res) {
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var SezonID = req.body.SezonID;
    var Tarih = req.body.Date

    con.query("SELECT COUNT(*) AS count FROM gecilensezonlar WHERE KullaniciID=? AND SezonID=?", [KullaniciID, SezonID], function (err, result) {
        if (result[0].count > 0) {
            res.json({
                message: "failed"
            });
        } else {
            con.query("INSERT INTO gecilensezonlar (KullaniciID,SezonID,Tarih) VALUES (?,?,?)", [KullaniciID, SezonID, Tarih], function (err, result) {
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

    console.log("a " + KullaniciID)
    console.log("b " + SezonID)

    // SezonID ile bölümleri al
    con.query("SELECT * FROM bolum WHERE SezonID = ?", [SezonID], (err, bolumlerResult) => {
        if (err) {
            return res.status(500).json({ message: "Bölümleri alırken hata oluştu." });
        }

        // Geçilen bölümleri al
        con.query("SELECT * FROM oynananbolumler WHERE KullaniciID = ? AND GectiMi = 1", [KullaniciID], (err, gecilenBolumlerResult) => {
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

router.get("/temelKategoriler", (req, res) => {
    var con = getDb.getConnection();
    var AnaDilID = req.query.AnaDilID
    var HangiDilID = req.query.HangiDilID

    con.query("SELECT tk.id,tkc.Ceviri,tk.value,tk.Image FROM temelkategoriceviri tkc INNER JOIN temelkategoriler tk ON tk.id = tkc.KelimeID WHERE AnaDilID =? and HangiDilID = ?", [AnaDilID, HangiDilID], (err, result) => {
        if (err) { throw err }

        return res.json({ message: result })
    })
})

router.get("/temelBolumler", (req, res) => {
    var con = getDb.getConnection();
    var AnaDilID = req.query.AnaDilID
    var HangiDilID = req.query.HangiDilID
    var KategoriID = req.query.KategoriID

    con.query("SELECT tb.id,tb.value,tbc.ceviri,tb.Order,tb.Image FROM temelbolumler tb INNER JOIN temelbolumlerceviri tbc ON tb.id = tbc.KelimeID WHERE tbc.AnaDilID =? and tbc.HangiDilID = ? and tb.KategoriID = ?", [AnaDilID, HangiDilID, KategoriID], (err, result) => {
        if (err) { throw err }

        return res.json({ message: result })
    })
})


router.get("/temelKelimeler", (req, res) => {
    var con = getDb.getConnection();
    var AnaDilID = req.query.AnaDilID
    var HangiDilID = req.query.HangiDilID
    var BolumID = req.query.BolumID

    con.query("SELECT tk.id,tk.value,tkc.ceviri,tk.Image FROM temelkelimeler tk INNER JOIN temelkelimelerceviri tkc ON tk.id = tkc.KelimeID WHERE tkc.AnaDilID = ? AND tkc.HangiDilID = ? AND tk.BolumID = ? ", [AnaDilID, HangiDilID, BolumID], (err, result) => {
        if (err) { throw err }

        return res.json({ message: result })
    })
})

router.post("/OynananTemelOyun", (req, res) => {
    var con = getDb.getConnection()

    var KullaniciID = req.body.KullaniciID
    var BolumID = req.body.BolumID
    var KategoriID = req.body.KategoriID
    var Tarih = req.body.Date
    var GectiMi = req.body.GectiMi

    con.query("SELECT COUNT(*) as count FROM oynanantemelbolumler WHERE KullaniciID = ? AND GecilenBolumID = ? AND KategoriID = ?", [KullaniciID, BolumID, KategoriID], (err, result) => {
        if (err) { throw err }

        if (result[0].count) {

            con.query("SELECT GectiMi FROM oynanantemelbolumler WHERE KullaniciID = ? AND GecilenBolumID = ? AND KategoriID = ? and Tarih = ?", [KullaniciID, BolumID, KategoriID, Tarih], (err, result) => {
                if (err) { throw err }

                if (result[0].GectiMi) {
                    res.json({ message: "Bu Bölümü Daha Önce Geçmişsin" })

                } else {
                    con.query("UPDATE oynanantemelbolumler SET GectiMi = ? , Tarih = ? WHERE KullaniciID = ? AND GecilenBolumID = ? AND KategoriID = ?", [GectiMi, Tarih, KullaniciID, BolumID, KategoriID], (err, result) => {
                        if (err) { throw err }
                        res.json({ message: "succes" })

                    })
                }
            })
        } else {
            con.query("INSERT INTO oynanantemelbolumler (GecilenBolumID,KategoriID,KullaniciID,Tarih,GectiMi) values(?,?,?,?,?)", [BolumID, KategoriID, KullaniciID, Tarih, GectiMi], (err, result) => {
                if (err) { throw err }
                res.json({ message: "succes" })
            })
        }
    })
})

router.get("/temelGecilenBolum", (req, res) => {
    var con = getDb.getConnection()
    var KullaniciID = req.query.KullaniciID

    con.query("SELECT gtb.GecilenBolumID,tb.KategoriID,gtb.KullaniciID,tb.Order FROM oynanantemelbolumler gtb INNER JOIN temelbolumler tb ON gtb.GecilenBolumID = tb.id WHERE KullaniciID = ? AND GectiMi = 1", [KullaniciID], (err, result) => {
        if (err) throw err

        res.json({ message: result })
    })

})

router.post("/temelSozluk", (req, res) => {
    var con = getDb.getConnection()

    var KullaniciID = req.body.KullaniciID
    var KelimeID = req.body.KelimeID
    var Tarih = req.body.Date
    con.query("SELECT COUNT(*) AS count FROM temelkelimelersozluk WHERE KelimeID = ? AND KullaniciID = ?", [KelimeID, KullaniciID], (err, result) => {
        if (err) { throw err }

        console.log(result[0].count)

        if (result[0].count == 0) {
            con.query("INSERT INTO temelkelimelersozluk (KelimeID,KullaniciID,Tarih) values(?,?,?)", [KelimeID, KullaniciID, Tarih], (err, result) => {
                if (err) { throw err }

                res.json({ message: "Sözlüğe Eklendi" })
            })
        } else {
            res.json({ message: "Zaten Sözlüğe Eklenmiş" })

        }
    })

})

router.get("/temelSozluk", (req, res) => {
    var con = getDb.getConnection()

    var KullaniciID = req.query.KullaniciID

    con.query("SELECT tk.id,tk.value,tkc.Ceviri,tk.Image FROM temelkelimelersozluk tks INNER JOIN temelkelimeler tk ON tks.KelimeID = tk.id INNER JOIN temelkelimelerceviri tkc ON tkc.KelimeID = tk.id WHERE tks.KullaniciID = ?", [KullaniciID], (err, result) => {
        if (err) { throw err }

        console.log(result)
        res.json({ message: result })
    })
})

router.delete("/temelSozluk", (req, res) => {
    var con = getDb.getConnection();

    const KullaniciID = req.query.KullaniciID;
    const KelimeID = req.query.KelimeID;

    con.query("DELETE FROM temelkelimelersozluk WHERE KullaniciID = ? AND KelimeID = ?", [KullaniciID, KelimeID], (err, result) => {
        if (err) {
            throw err;
        }

        // Silme işleminin başarılı olup olmadığını kontrol et
        if (result.affectedRows > 0) {
            res.json({ message: "Başarıyla Silindi" });
        } else {
            res.status(404).json({ message: "Silinecek kayıt bulunamadı" });
        }
    });
});

router.get("/temelIlerleme", (req, res) => {  /* temel eğitimdeki ilerleme barı */
    var con = getDb.getConnection();

    const id = req.query.id

    con.query("SELECT COUNT(*) AS count FROM temelBolumler", (err, result) => {
        if (err) { throw err }

        const bolumSayisi = result[0].count

        con.query("SELECT COUNT(*) AS count FROM oynanantemelbolumler WHERE KullaniciID = ? and GectiMi = 1", [id], (err, results) => {
            if (err) { throw err }

            const gecilenBolumSayisi = results[0].count

            res.json({ bolumSayisi: bolumSayisi, gecilenBolumSayisi: gecilenBolumSayisi })
        })
    })
})

router.get("/egzersiz", (req, res) => {
    var con = getDb.getConnection();

    con.query("SELECT * FROM egzersiz", (err, result) => {
        if (err) { throw err }

        res.json({ message: result })
    })
})

router.post("/yanlisBilinenKelime", (req, res) => { /* yanlis bilinen kelime kaydetme */
    var con = getDb.getConnection();

    var KelimeID = req.body.KelimeID
    var KullaniciID = req.body.KullaniciID
    var TemelMi = req.body.TemelMi
    var Tarih = req.body.Date
    con.query("SELECT COUNT(*) as count FROM yanlisbilinenkelimeler WHERE KelimeID = ? AND KullaniciID = ?", [KelimeID, KullaniciID], (err, result) => {
        if (err) { throw err }

        const count = result[0].count

        if (count > 0) {
            res.json({ message: "Zaten Ekli" })
        } else {
            con.query("INSERT INTO yanlisbilinenkelimeler (KelimeID,KullaniciID,temelMi,aktifMi,Tarih) values(?,?,?,1,?)", [KelimeID, KullaniciID, TemelMi, Tarih], (err, result) => {
                if (err) { throw err }

                if (result.affectedRows > 0) {
                    res.json({ message: "Başarıyla Eklendi" });
                } else {
                    res.status(404).json({ message: "Bir Hata Var" });
                }
            })
        }
    })

})

router.get("/yanlisBilinenKelime", (req, res) => { /* yanlis bilinen kelime getirme */
    var con = getDb.getConnection();

    var KullaniciID = req.query.KullaniciID
    var TemelMi = req.query.TemelMi
    console.log(TemelMi)

    console.log(TemelMi)
    if (TemelMi == 1) {
        con.query("SELECT ybk.KelimeID,ybk.KullaniciID,tk.value,tkc.Ceviri,tk.Image FROM yanlisbilinenkelimeler ybk INNER JOIN temelkelimeler tk ON ybk.KelimeID = tk.id INNER JOIN temelkelimelerceviri tkc ON tk.id = tkc.KelimeID WHERE ybk.KullaniciID = ? AND ybk.temelMi = 1 AND ybk.aktifMi=1", [KullaniciID], (err, result) => {
            if (err) { throw err }

            res.json({ message: result })
        })
    } else if (TemelMi == 0) {
        con.query("SELECT ybk.KullaniciID, ybk.KelimeID, ak.Value, c.Ceviri FROM yanlisbilinenkelimeler ybk INNER JOIN anakelimeler ak ON ybk.KelimeID = ak.AnaKelimelerID INNER JOIN ceviriler c ON c.AnaKelimeID = ak.AnaKelimelerID WHERE ybk.KullaniciID = ? AND ybk.TemelMi = 0 AND ybk.aktifMi=1", [KullaniciID], (err, result) => {
            if (err) { throw err }

            res.json({ message: result })
        })
    }
})

router.put("/yanlisBilinenKelime", (req, res) => { /* yanlis bilinen kelime silme(değiştirme aktifliği) */
    var con = getDb.getConnection();
    const KullaniciID = req.body.KullaniciID
    const KelimeID = req.body.KelimeID
    const temelMi = req.body.temelMi
    console.log(KelimeID)
    console.log(temelMi)
    console.log(KullaniciID)

    con.query("UPDATE yanlisbilinenkelimeler ybk SET ybk.aktifMi = 0 WHERE ybk.kullaniciID = ? AND ybk.KelimeID = ? AND ybk.temelMi=?", [KullaniciID, KelimeID, temelMi], (err, result) => {
        if (err) { throw err }

        if (result.affectedRows > 0) {
            res.json({ message: "Başarıyla Değişti" });
        } else {
            res.status(404).json({ message: "Bir Hata Var" });
        }
    })
})

router.get("/dinlemeEgzersizi", (req, res) => {
    var con = getDb.getConnection();
    const KullaniciID = req.query.KullaniciID
    const temelMi = req.query.temelMi
    const AnaDilID = req.query.AnaDilID
    const HangiDilID = req.query.HangiDilID
    const MeslekID = req.query.MeslekID

    if (temelMi == 0) {
        con.query("SELECT ak.AnaKelimelerID AS id , ak.Value ,c.Ceviri FROM anakelimeler ak INNER JOIN ceviriler c ON ak.AnaKelimelerID = c.AnaKelimeID WHERE ak.test = 1 AND c.AnaDilID = ?  AND c.HangiDilID = ? AND ak.MeslekID = ?", [AnaDilID, HangiDilID, MeslekID], (err, result) => {
            if (err) throw err

            res.json({ message: result })
        })
    } else if (temelMi == 1) {
        con.query("SELECT tk.id,tk.value,tkc.Ceviri FROM temelkelimeler tk INNER JOIN temelkelimelerceviri tkc ON tk.id = tkc.KelimeID WHERE tkc.AnaDilID = ? AND tkc.HangiDilID = ?", [AnaDilID, HangiDilID], (err, result) => {
            if (err) throw err

            res.json({ message: result })

        })
    }
})

router.post("/GunlukGorevSozluk", function (req, res) {
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

router.post("/GunlukGorevHata", (req, res) => {  /* hataları gözden geçirme ekranaına baktıysa bu api çalışcak */
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var Tarih = req.body.Date;

    con.query("SELECT COUNT(*) AS count FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], (err, result) => {
        if (err) { throw err }

        if (result[0].count) {
            con.query("UPDATE gunlukgorev SET HataEgzersiz=1 WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], (err, result) => {
                if (err) { throw err }

                res.json({ message: "succes" })
            })
        } else {
            con.query("INSERT INTO gunlukgorev (KullaniciID,Tarih,HataEgzersiz) values(?,?,?)", [KullaniciID, Tarih, 1], (err, result) => {
                if (err) { throw err }

                res.json({ message: "succes" })
            })
        }
    })
})

router.post("/GunlukGorevEgzersiz", (req, res) => {  /* egzersiz yaparsa kaydetcek */
    var con = getDb.getConnection();
    var KullaniciID = req.body.KullaniciID;
    var Tarih = req.body.Date;

    con.query("SELECT COUNT(*) as count FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], (err, result) => {
        if (err) { throw err }


        if (result[0].count) {
            con.query("UPDATE gunlukgorev SET Egzersiz=1 WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], (err, result) => {
                if (err) { throw err }

                res.json({ message: "succes" })
            })
        } else {
            con.query("INSERT INTO gunlukgorev (KullaniciID,Tarih,Egzersiz) values(?,?,?)", [KullaniciID, Tarih, 1], (err, result) => {
                if (err) { throw err }

                res.json({ message: "succes" })
            })
        }
    })
})

router.get("/MeslekiEgitimKontrol", (req, res) => {
    var con = getDb.getConnection();

    var KullaniciID = req.query.KullaniciID
    var Tarih = req.query.Date

    con.query("SELECT COUNT(*) as count FROM oynananbolumler WHERE KullaniciID = ? AND Tarih = ? AND GectiMi = 1", [KullaniciID, Tarih], (err, result) => {
        if (err) throw err
        res.json({ message: result[0].count })
    })
})

router.get("/TemelEgitimKontrol", (req, res) => {
    var con = getDb.getConnection();

    var KullaniciID = req.query.KullaniciID
    var Tarih = req.query.Date

    con.query("SELECT COUNT(*) AS count FROM oynanantemelbolumler WHERE  KullaniciID = ? AND Tarih = ? AND GectiMi = 1", [KullaniciID, Tarih], (err, result) => {
        if (err) throw err
        res.json({ message: result[0].count })
    })
})

router.get("/SozlukTekrariKontrol", (req, res) => {
    var con = getDb.getConnection();

    var KullaniciID = req.query.KullaniciID;
    var Tarih = req.query.Date;

    con.query(
        "SELECT SozlukGiris FROM gunlukgiris WHERE KullaniciID = ? AND Tarih = ?",
        [KullaniciID, Tarih],
        (err, result) => {
            if (err) throw err;

            if (!result || result.length === 0) {
                res.json({ message: 0 });
            } else {
                console.log(result[0]?.SozlukGiris || 0);
                res.json({ message: result[0]?.SozlukGiris || 0 });
            }
        }
    );
});

router.get("/GunlukGorevHataKontrol", (req, res) => {
    var con = getDb.getConnection();

    var KullaniciID = req.query.KullaniciID;
    var Tarih = req.query.Date;

    con.query(
        "SELECT HataEgzersiz FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?",
        [KullaniciID, Tarih],
        (err, result) => {
            if (err) throw err;

            if (!result || result.length === 0) {
                res.json({ message: 0 });
            } else {
                console.log(result[0]?.HataEgzersiz || 0);
                res.json({ message: result[0]?.HataEgzersiz || 0 });
            }
        }
    );
});

router.get("/GunlukGorevEgzersizKontrol", (req, res) => {
    var con = getDb.getConnection();

    var KullaniciID = req.query.KullaniciID;
    var Tarih = req.query.Date;

    con.query(
        "SELECT Egzersiz FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?",
        [KullaniciID, Tarih],
        (err, result) => {
            if (err) throw err;

            if (!result || result.length === 0) {
                res.json({ message: 0 });
            } else {
                console.log(result[0]?.Egzersiz || 0);
                res.json({ message: result[0]?.Egzersiz || 0 });
            }
        }
    );
});

router.post("/GunlukGorevTamamlandi", (req, res) => {
    var con = getDb.getConnection();

    var KullaniciID = req.body.KullaniciID;
    var Tarih = req.body.Date;



    con.query("SELECT TamamlandiMi FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], (err, result) => {
        if (err) throw err;
        console.log(result);

        // Eğer sonuç boşsa, UPDATE işlemini yap
        if (!result || result.length === 0 || result[0].TamamlandiMi === null) {
            con.query("UPDATE gunlukgorev SET TamamlandiMi = 1 WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], (err, result) => {
                if (err) throw err;

                res.json({ message: "success" });
            });
        } else {
            res.json({ message: "failed" });
        }
    });
});

router.get("/Test", (req, res) => {
    var con = getDb.getConnection();

    var MeslekID = req.query.MeslekID;
    var DilID = req.query.DilID;
    var OgrencegiDilID = req.query.OgrencegiDilID;

    con.query("CALL TestOlusturma(?,?,?)", [MeslekID, DilID, OgrencegiDilID], (err, result) => {
        if (err) throw err;

        res.json({ message: result })
    })
})

router.post("/test", (req, res) => {
    var con = getDb.getConnection();

    var name = req.body.Name;
    var Tarih = req.body.Date;

    con.query("INSERT INTO test (GirilenAd,Tarih) values(?,?)", [name, Tarih], (err, result) => {
        if (err) throw err;

        res.json({ success: true, id: result.insertId });
    })
})

router.post("/TestSorulari", (req, res) => {
    var con = getDb.getConnection();

    var TestID = req.body.TestID
    var KelimeID = req.body.KelimeID
    var dogruMu = req.body.dogruMu

    con.query("INSERT INTO testsorulari (TestID,KelimeID,dogruMu) values(?,?,?)", [TestID, KelimeID, dogruMu], (err, result) => {
        if (err) throw err;

        res.json({ message: "succes" })
    })

})

router.post("/TestIDKaydet", (req, res) => {
    var con = getDb.getConnection();

    var TestID = req.body.TestID;
    var KullaniciID = req.body.KullaniciID;

    con.query("SELECT TestID FROM kullanici WHERE id = ?", [KullaniciID], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "ERROR", message: "Veritabanı hatası", error: err });
        }

        // Kullanıcı bulunamadıysa
        if (result.length === 0) {
            return res.status(404).json({ status: "ERROR", message: "Kullanıcı bulunamadı" });
        }

        con.query("SELECT TestID FROM kullanici WHERE id = ?", [KullaniciID], (err, result) => {
            if (err) {
                return res.status(500).json({ status: "ERROR", message: "Veritabanı hatası", error: err });
            }

            // Eğer daha önce TestID varsa, işlem yapılmasın
            if (result[0] && result[0].TestID !== null) {
                return res.json({ status: "FAIL", message: "Zaten test yapmışsınız." });
            }

            // TestID daha önce kaydedilmemişse, güncelleme işlemi yapılacak
            con.query("UPDATE kullanici SET TestID = ? WHERE id = ?", [TestID, KullaniciID], (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ status: "ERROR", message: "TestID kaydedilirken hata oluştu", error: updateErr });
                }
                return res.json({ status: "SUCCESS", message: "TestID başarıyla kaydedildi." });
            });
        });
    });
});

router.get("/TestSonucu", (req, res) => {
    var con = getDb.getConnection();

    var KullaniciID = req.query.KullaniciID
    console.log(KullaniciID)
    con.query("SELECT k.TestID, ak.AnaKelimelerID,ts.dogruMu,sv.SeviyeAdi,sv.Order FROM kullanici k INNER JOIN testsorulari ts ON k.TestID = ts.TestID INNER JOIN anakelimeler ak ON ts.KelimeID = ak.AnaKelimelerID INNER JOIN bolum b ON ak.BolumID = b.BolumID INNER JOIN sezon s ON b.SezonID = s.SezonID INNER JOIN seviye sv ON s.SeviyeID = sv.SeviyeID WHERE k.id = ? ORDER BY sv.Order asc", [KullaniciID], (err, result) => {
        if (err) throw err;

        console.log(result)
        res.json({ message: result })
    })
})

router.post("/Egzersiz", (req, res) => { /* yapılan egzersizleri kaydeden endpoint */
    var con = getDb.getConnection();

    var KullaniciID = req.body.KullaniciID
    var TemelMi = req.body.TemelMi
    var EgzersizID = req.body.EgzersizID
    var KelimeID = req.body.KelimeID
    var DogruMu = req.body.DogruMu

    con.query("SELECT COUNT(*) as count FROM egzersizistatistikleri WHERE KullaniciID = ? AND EgzersizID = ?  AND KelimeID = ? AND TemelMi = ?", [KullaniciID, EgzersizID, KelimeID, TemelMi], (err, result) => {
        if (err) throw err

        console.log("egzersiz istatistik = " + result[0].count)
        if (result[0].count > 0) {
            con.query("UPDATE egzersizistatistikleri SET DogruMu = ? WHERE KullaniciID = ? AND EgzersizID = ? AND KelimeID = ? AND TemelMi = ?", [DogruMu, KullaniciID, EgzersizID, KelimeID, TemelMi], (err, result) => {
                if (err) throw err

                res.json({ message: "Degistirildi" })
            })
        } else {
            con.query("INSERT INTO egzersizistatistikleri (KullaniciID,TemelMi,EgzersizID,KelimeID,DogruMu) values(?,?,?,?,?)", [KullaniciID, TemelMi, EgzersizID, KelimeID, DogruMu], (err, result) => {
                if (err) throw err

                if (result.affectedRows > 0) {
                    res.json({ message: "Eklendi" })

                } else {
                    res.json({ message: "Ekleme Hatasi" })
                }
            })
        }
    })


})
module.exports = router