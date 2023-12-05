import { json } from "body-parser";
import mysql from "mysql" 
import util from "util"
/* var db =  require("./database")
var db = db.database
var getDb = new db()

var con = mysql.createConnection({
    host:getDb.getHost,
    user:getDb.getUser,
    password:getDb.getPassword,
    database:getDb.getDataBase
})

con.connect((err)=>{
    if(err)
        console.log("Hata")
}) */


exports.user = function(kullaniciAdi){  

    const query = util.promisify(con.query).bind(con);  //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık

    this.userInfo = async function(){
        var result = await query("SELECT * FROM kullanici WHERE kullaniciAdi = ?",kullaniciAdi)
        return result
    }
    
    this.userFind = async function() {
      var result = await query("Select COUNT(*) as sayi FROM kullanici WHERE kullaniciAdi = ?",kullaniciAdi);
      var sayiString = JSON.parse(JSON.stringify(result))
     
      if(sayiString[0].sayi){
          return true
      }
      else{
          return false
      }
    }
    
}



