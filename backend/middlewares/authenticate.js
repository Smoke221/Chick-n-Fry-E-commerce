const jwt = require('jsonwebtoken')

const authenticate = (req,res,next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,'chick-n-fry',(err,decoded) => {
            if(decoded){
                console.log(decoded.adminID);
                req.body.admin = decoded.adminID
                next()
            }else{
                res.send({'msg':'please login'})
            }
        })
    }else{
        res.send({'msg':'please login'})
    }
}

module.exports = {
    authenticate
}