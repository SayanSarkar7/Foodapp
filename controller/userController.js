const userModel=require('../models/userModel')
const cookieParser = require('cookie-parser');

module.exports.getUsers=async function getUsers(req,res){
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

module.exports.postUser=function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
}

module.exports.updateUser=async function updateUser(req,res){
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

module.exports.deleteUser=async function deleteUser(req,res){
    // users={};
    let dataToBeDeleted=req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
}

module.exports.getUserById=function getUserById(req,res){
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


module.exports.setCookies=function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true,httpOnly:true});
    res.cookie('isPrimeMember',true,{maxAge:1000*60*60*24, secure:true,httpOnly:true});
    res.send('cookies has been set ');
}

module.exports.getCookies=function getCookies(req,res){
    let cookies=req.cookies;
    console.log(cookies);
    res.send('cookies received');
}

