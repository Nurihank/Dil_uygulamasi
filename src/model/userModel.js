import { json } from "body-parser";
import mysql from "mysql" 
import util from "util"

var db =  require("./database")
var getDb = new db()
getDb.connect();


exports.user = function(kullaniciAdi){  
    var con = getDb.getConnection();
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



