import jwt from "jsonwebtoken"

var db = require("../model/database")  //database modelini çağırdık
var getDb = new db();  //objemizi oluşturduk

getDb.connect();  //veri tabanı bağlantısını yaptık


export const userMiddleware = (req, res, next) => {  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Token gereklidir" });
    }
//veri tabanı kontrolüde şart yoksa her token her kullanıcıyı açar
    const token = authHeader.split(" ")[1];
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token doğrulama hatası", error: err.message });
        }
        
        req.user = decoded; // Opsiyonel: İsteğe kullanıcı bilgisini ekleyin

        next();
    });
}
module.exports = userMiddleware;