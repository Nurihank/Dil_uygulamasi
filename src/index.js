require('dotenv').config() //tokenlerin gözükmesi için yazdık bunu 
import express from "express"
import bodyParser from "body-parser";
import kullaniciRouter from "./routes/kullaniciRouter.js"

const cors = require('cors');
const app = express();

app.use(bodyParser.json())

app.use(cors());

app.use(express.urlencoded({extended:true}))
app.use(express.json())  //verileri json formatına çeviriyor  

app.listen(3000,(err)=>{
    if(err){
        console.log("hata verdi")
    }
})

app.use("/kullanici",kullaniciRouter)
