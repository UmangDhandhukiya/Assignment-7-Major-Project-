const mongoose = require("mongoose")

//connect mongodb
const connectDb = async () => {
    try{
        mongoose.connection.on('connected',() => console.log("DB connected"))
        await mongoose.connect(`${process.env.MONGO_DB_STRING}/blogMania`)
    }catch(err){
        console.log(err);
        
    }
}

module.exports = connectDb