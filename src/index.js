require('dotenv').config() //tokenlerin gözükmesi için yazdık bunu
import express from "express"
import bodyParser from "body-parser";
import kullaniciRouter from "./routes/kullaniciRouter.js"
import authorizedRouter from "./routes/authorizedRouter.js"
import { networkInterfaces, userInfo } from "os";
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

app.use("/kullanici",kullaniciRouter)
app.use("/authorized",authorizedRouter)
app.use("/adminLogin",adminRouter)
 
