const jwt = require('jsonwebtoken');
// Verifying the user wether he is valid or notb 
module.exports=(req,res,next)=>{
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split('Bearer ')[1];
    try{
        jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(error){
        return res.status(401).json({error:[{msg:error.message}]})
    }
} 