const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bookStore = require("./models/Book.js")
const dotenv = require("dotenv")

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

//mongoose connection 

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(console.log("connected to db"))
    .catch((err) => console.log(err))
    

app.get("/books",(req,res) => {
    bookStore.find().then(book => res.json(book))
})

app.delete("/delete/:id", (req,res) => {
    const id = req.params.id;

    bookStore.findByIdAndDelete({_id:id}, (err) => {
        if(!err){
            console.log("book has been deleted")
        }else{
            console.log(err)
        }
    })
})

app.post("/addbook", async (req,res) => {
    try{
        const newBook = new bookStore({
            bookName: req.body.bookName,
            author: req.body.author,
            quantity: req.body.quantity,
            comment: req.body.comment
        })
        
        const book = await newBook.save()
        res.status(200).json(book)

    }catch(err){
        console.log(err)
    }
})

app.put("/lend/:id", async (req,res) => {
    try{
        await bookStore.findByIdAndUpdate(req.params.id, {$inc:{quantity:-1}})
    }catch(err) {
        console.log(err)
    }
})

app.put("/back/:id", async (req,res) => {
    try{
        await bookStore.findByIdAndUpdate(req.params.id, {$inc:{quantity:1}})
    }catch(err) {
        console.log(err)
    }
})

app.listen(5000,() => {
    console.log("server is working");
})

