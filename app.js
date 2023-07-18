// WJqnF6nnelZRAJZL
const express = require('express');
const mongoose=require('mongoose');
const app=express();


// middleware function ->post,front ->json
app.use(express.json()); // global middleware
app.use(express.urlencoded({extended:true}));
app.listen(3000);

// let users={};
// let users=[
    //     {
        //         'id':1,
        //         'name':'sayan'
        //     },
        //     {
            //         'id':2,
            //         'name':'ronaldo'
            //     },
            //     {
                //         'id':3,
                //         'name':'messi'
                //     }
                // ];
                
const userRouter=express.Router();
const authRouter=express.Router();

// base route, router to use
app.use('/user',userRouter);
app.use('/auth',authRouter);

// mini app
userRouter
.route('/')
.get(getUsers) // path specefic middleware
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById);
// app.get('/user',)
// app.post('/user',);
// // update -> patch
// app.patch('/user',)
// // Delete
// app.delete('/user',);

// /user/1
// params
// app.get('/user/:id',)

// sign up authintication
authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp)

async function getUsers(req,res){
    // console.log(req.query);
    // find()->all records
    // let user=await userModel.find();
    let user=await userModel.findOne({name:'ronaldo'})
    // res.send(users);
    res.json({
        message:'list of all users',
        data:user
    })
}

function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
}

async function updateUser(req,res){
    console.log('req.body->',req.body);
    // update data in users obj
    let dataToBeUpdated=req.body;
    let user=await userModel.findOneAndUpdate({email:'yza25thhtgmail.com'},dataToBeUpdated);
    // for(key in dataToBeUpdated){
    //     users[key]=dataToBeUpdated[key];
    // }
    res.json({
        message:"data updated successfully"
    })
}

async function deleteUser(req,res){
    // users={};
    let dataToBeDeleted=req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
}

function getUserById(req,res){
    console.log(req.params.id);
    console.log(req.params);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"user id received",
        data:obj
    });
    // res.send("");
}

function middleware1(req,res,next){
    console.log('middleware1 encountered');
    next(); // next means getSignUp function
}
function middleware2(req,res){
    console.log('middleware2 encountered');
    // next(); // next means getSignUp function
    console.log('middlware 2 ended req/res cycle');
    res.sendFile('/public/index.html',{root:__dirname});
}








function getSignUp(req,res,next){
    console.log('getSignUp called');
    next();
    // res.sendFile('/public/index.html',{root:__dirname});
}

async function postSignUp(req,res){
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    // let obj=req.body;
    console.log('backend',user);
    res.json({
        message:"User signed up successfully.",
        data:user
    });
}

// tGJaPxtX61xQBXuU
const db_link="mongodb+srv://Sayan:12345678Sayan@cluster0.wseih1d.mongodb.net/foodapp?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
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
        // required:true,
        minLength:6
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:6 
    }
});

// model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;
// (async function createUser(){
//     let user={
//         name:'ronaldo',
//         email:'cr7@gmail.com',
//         password:'123456',
//         confirmPassword:'123456'
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// })();



// WJqnF6nnelZRAJZL->password

