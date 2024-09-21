const jwt = require('jsonwebtoken');

var db = require("../model/database");  // database modelini çağırdık
var getDb = new db();  // objemizi oluşturduk

getDb.connect();  // veri tabanı bağlantısını yaptık

// Promisify yapısı: query'yi promise'a çeviriyoruz
const queryAsync = (con, query, params) => {
    return new Promise((resolve, reject) => {
        con.query(query, params, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const userMiddleware = async (req, res, next) => {
    var con = getDb.getConnection();
    const requestToken = req.headers["authorization"] || req.headers["Authorization"];

    if (!requestToken) {
        return res.status(403).json({ message: "Token gereklidir" });
    }

    let token = requestToken.substring(7); // "Bearer " uzunluğu 7
    if (token.startsWith('"') && token.endsWith('"')) {
        token = token.substring(1, token.length - 1); // Başındaki ve sonundaki tırnak işaretlerini kaldır
    }

    const decodedTokenContent = jwt.decode(token);

    try {
        // Token'ı veritabanından kontrol ediyoruz
        const result = await queryAsync(con, "SELECT accesToken FROM kullanici WHERE id = ?", [decodedTokenContent.id]);

        if (result[0].accesToken !== token) {
            return res.status(401).json({ message: "Token doğru değil" });
        }

        // Token'ı doğruluyoruz
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: "Token süresi dolmuş" });
                } else {
                    return res.status(401).json({ message: "Token doğrulama hatası", error: err.message });
                }
            }

            req.user = decoded;  // Kullanıcı bilgilerini isteğe ekliyoruz
            next();  // Sonraki middleware'e geçiyoruz
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Veritabanı hatası", error: err.message });
    }
};

module.exports = userMiddleware;
