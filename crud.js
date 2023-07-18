const express=require('express')
const mongoose=require('mongoose')

const app=express()

app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.send("Hello");
})

app.post('/product',async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body);
    try {
        const user=await product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
})

mongoose.connect("mongodb+srv://admin:tGJaPxtX61xQBXuU@cluster0.wseih1d.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000,()=>{
        console.log("Node api on port 3000");
    })
    console.log('Connected to mongodb');
})
.catch((error)=>{
    console.log(error);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:6
    }
});

const product=mongoose.model('product',userSchema);
module.exports=product;
