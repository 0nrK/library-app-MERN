const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type:String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    comment: {
        type: String
    }
},{timestamps: true}) 

module.exports =  mongoose.model("bookStore", bookSchema)