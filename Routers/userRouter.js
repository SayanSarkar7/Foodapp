const express = require('express');
const cookieParser = require('cookie-parser');
const userModel=require('../models/userModel')
const userRouter=express.Router();
const protectRoute=require('./authHelper');

// mini app
userRouter
.route('/')
.get(protectRoute, getUsers) // path specefic middleware
.post(postUser)
.patch(updateUser)
.delete(deleteUser)


userRouter
.route("/getCookies")
.get(getCookies)

userRouter
.route("/setCookies")
.get(setCookies)


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

async function getUsers(req,res){
    // console.log(req.query);
    // find()->all records
    let users=await userModel.find();
    // let user=await userModel.findOne({name:'ronaldo'})
    // res.send(users);
    if(users){
        return res.json(users);
        
    }else{
        res.json({
            message:'user not found'
        })
    }
    
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


function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true,httpOnly:true});
    res.cookie('isPrimeMember',true,{maxAge:1000*60*60*24, secure:true,httpOnly:true});
    res.send('cookies has been set ');
}

function getCookies(req,res){
    let cookies=req.cookies;
    console.log(cookies);
    res.send('cookies received');
}



module.exports=userRouter;