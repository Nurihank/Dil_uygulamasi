require('dotenv').config() //tokenlerin gözükmesi için yazdık bunu
import express from "express"
import bodyParser from "body-parser";
import kullaniciRouter from "./routes/kullaniciRouter.js"
import authorizedRouter from "./routes/authorizedRouter.js"
import { networkInterfaces, userInfo } from "os";
const jwt = require("jsonwebtoken")  //token oluşturmak için
const crypto = require("crypto")
import adminRouter from "./routes/adminLoginRouter.js"


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())  //verileri json formatına çeviriyor  

app.listen(3000,(err)=>{
    if(err){
        console.log("hata verdi")
    }
})

/* var getUserInfo = userModel.user
var sifre = new getUserInfo("NurihanK");
sifre.getUser(); 
sifre.userFind();
 */

app.use("/kullanici",kullaniciRouter)
app.use("/authorized",authorizedRouter)
app.use("/adminLogin",adminRouter)
 
