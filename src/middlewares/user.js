const jwt = require('jsonwebtoken');

var db = require("../model/database")  //database modelini çağırdık
var getDb = new db();  //objemizi oluşturduk

getDb.connect();  //veri tabanı bağlantısını yaptık

const userMiddleware = (req, res, next) => {
    
    //database kontrolüde yapcaz UNUTMA
    
    const requestToken = req.headers["authorization"] || req.headers["Authorization"];

    if (!requestToken) {
        return res.status(403).json({ message: "Token gereklidir" });
    }

    let token = requestToken.substring(7); // "Bearer " uzunluğu 7
    if (token.startsWith('"') && token.endsWith('"')) {
        token = token.substring(1, token.length - 1); // Başındaki ve sonundaki tırnak işaretlerini kaldır
    }   
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token süresi dolmuş" });
            } else {
                return res.status(401).json({ message: "Token doğrulama hatası", error: err.message });
            }
        }

        req.user = decoded;

        next(); 
    });


};

module.exports = userMiddleware;

