import jwt from "jsonwebtoken"
export const authMiddleware = (req,res,next)=>{  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
    //Bearer = token başta bu halde ondan split dedik bu headeri ikiye bölcek
    const token = req.headers["authorization"]?.split(' ')[1]

    if(!token){
        return res.status(401).json({message:"giriş yapin"}) //token yoksa 401 yani bu işlemi gerçekleştiemeizsin diyo
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{ //tokeni doğruluyo eğer doğruysa user objesini döndürüyor 
        if(err){
            return res.status(400).json(err)
        }
        req.user = user
        next();
    }) 
}
module.exports = authMiddleware;