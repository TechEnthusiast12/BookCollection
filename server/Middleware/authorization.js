const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next)=>{
    try {
        const jwtToken = req.header('token');
        if(!jwtToken){
           return res.status(403).json('Not Authorized Please LogIn First');
        }
        const payload = await jwt.verify(jwtToken,process.env.SECRET);
        req.user = payload.user;
        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(403).json('Not Authorized Please LogIn First');
    }
}