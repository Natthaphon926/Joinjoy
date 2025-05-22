const prisma = require('../config/prisma')
const jwt = require('jsonwebtoken')


exports.authCheck = async (req, res, next) => {
  try {

    const headerToken = req.headers.authorization
    
    if(!headerToken){
        return res.status(401).json({message:'No Token'})
    }
    
    const token = headerToken.split(" ")[1]
    const decode = jwt.verify(token,process.env.SECRET)
    
    req.user = decode
    
    const user = await prisma.userAuth.findFirst({
        where:{
            email:req.user.email
        }
    })
    if(!user.enabled){
        return res.status(400).json({ message: "This account cannot access" });
    }
   
    next()
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Token Invalid" });
  }
};

exports.adminCheck = async(req, res, next) => {
    try{
        const {email} = req.user
        
        const adminUser = await prisma.userAuth.findFirst({
            where:{
                email:email
            }
        })
        if(adminUser.role !== 'admin'){
            return res.status(403).json({message:"Admin Only Access!!"})
        }
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server Error"})
    }
}
