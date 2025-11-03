const jwt = require("jsonwebtoken")

//middlware for authetication protected route
const auth = (req,res,next)=>{
    const token = req.headers.authorization

    try{
        jwt.verify(token, process.env.SECRET_KEY)
        next()
    }catch(err){
         res.status(400).send("ERROR :-" + err.message)
    }
}

module.exports = auth