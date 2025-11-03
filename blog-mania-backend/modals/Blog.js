const mongoose = require("mongoose")

//Blog modal
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog