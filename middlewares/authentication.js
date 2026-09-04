import jwt from "jsonwebtoken"


import dotenv from "dotenv"




export default function authenticateUser(req,res,next){
    const header = req.header("Authorization")
    // console.log(header);

    if(header!=null){
      const token = header.replace("Bearer ","")
      // console.log(token);
      
      jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
            if (decoded==null){
              res.status(401).json({
                message:"Invalid Token Please Login Again"
              })
            }else{
              req.user=decoded
              next()
            }
      })

    }else{
      next()
    }
    
    
  }

