const jwt = require("jsonwebtoken")

//admin controll for authenticcation
const adminLogin = async(req,res) => {
    try{
        const {email,password} = req.body
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS){
            return res.status(401).json({message:"invalid credential"})
        }

        const token = jwt.sign({email},process.env.SECRET_KEY)
        res.status(200).json({message:"successfull login",token:token})
    }catch(err){
        res.status(400).send("ERROR :-" + err.message)
    }
}

module.exports = adminLogin