const jwt = require('jsonwebtoken')
const authConfig = require('../../config/Auth')

module.exports = async(req, res, next) => {
    const headerAuth = req.headers.authorization

    const [, token] = headerAuth.split(" ")
    
    try{
        const user = await jwt.verify(token, authConfig.secret)
        
        req.userId = user.id        

    }catch(err) {
        return res.status(400).json({ error: "Invalid Token" })
    }
    
    return next()
} 