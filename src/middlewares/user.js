import jwt from "jsonwebtoken"

var db = require("../model/database")  //database modelini çağırdık
var getDb = new db();  //objemizi oluşturduk

getDb.connect();  //veri tabanı bağlantısını yaptık


export const userMiddleware = (req, res, next) => {  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
    //Bearer = token başta bu halde ondan split dedik bu headeri ikiye bölcek
    const requestToken = req.headers["authorization"]?.split(' ')[1] ?? null;
    console.log(requestToken)
    var con = getDb.getConnection();  //burda da bağlantıyı getirdik
    
    if(requestToken == null ){
            return res.status(403).json({ message: "Token Gereklidir" })
        }
    jwt.verify(requestToken,process.env.ACCESS_TOKEN_SECRET,(err)=>{
        if(err)  //tokenin süresi geçtiyse hata vercek
            return res.status(400).json(err)

        next()   
    })    
}
module.exports = userMiddleware;