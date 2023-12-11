import jwt from "jsonwebtoken"
import util from "util"

var db = require("../model/database")
var getDb = new db();
getDb.connect();

exports.userMiddleware = function(kullaniciAdi){
    var con = getDb.getConnection();
    const query = util.promisify(con.query).bind(con);

    
    
    this.tokenVerify = async function(){

        var result = await query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ", kullaniciAdi)
        var token = result[0].accesToken

        console.log(token)
        if (!token) {
            console.log("asf")
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("sdsas")
            }

        })
    }
}
