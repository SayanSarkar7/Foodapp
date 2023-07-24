const userModel=require('../models/userModel')
const cookieParser = require('cookie-parser');

module.exports.getUser=async function getUser(req,res){
    // console.log(req.query);
    // find()->all records
    let id=req.params.id;
    let user=await userModel.findById(id);
    // let user=await userModel.findOne({name:'ronaldo'})
    // res.send(users);
    if(user){
        return res.json(user);
        
    }else{
        res.json({
            message:'user not found'
        })
    }
    
}

// module.exports.postUser=function postUser(req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     });
// }

module.exports.updateUser=async function updateUser(req,res){
    // console.log('req.body->',req.body);
    // update data in users obj
    try{
        let id=req.params.id;
        let user=await userModel.findById(id);
        let dataToBeUpdated=req.body;
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData=await user.save();
            res.json({
                message:"data updated successfully",
                data:user
            })
        }
        else{
            res.json({
                message:"user not found"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    // let user=await userModel.findOneAndUpdate({email:'yza25thhtgmail.com'},dataToBeUpdated);
    // for(key in dataToBeUpdated){
    //     users[key]=dataToBeUpdated[key];
    // }
    
}

module.exports.deleteUser=async function deleteUser(req,res){
    // users={};
    // let dataToBeDeleted=req.body;
    try{
        let id=req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:"user not found"
            })
        }
        res.json({
            message:"data has been deleted",
            data:user
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.getAllUser=async function getAllUser(req,res){
    // console.log(req.params.id);
    // console.log(req.params);
    try{
        let users=await userModel.find();
        if(users){
            res.json({
                message:'users retrieved',
                data:users
            })
        }else{
            res.json({
                message:'user not retrieved'
            })
        }
        res.send("user id received");
    }
    catch{
    res.json({
        message:err.message
    })
}
    // let paramId=req.params.id;
    // let obj={};
    // for(let i=0;i<users.length;i++){
    //     if(users[i]['id']==paramId){
    //         obj=users[i];
    //     }
    // }
    // res.json({
    //     message:"user id received",
    //     data:obj
    // });
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

