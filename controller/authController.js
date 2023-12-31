const express = require('express');
const { model } = require('mongoose');
const cookieParser = require('cookie-parser');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../secrets');
// const authRouter=express.Router();

// sign up authintication
// authRouter
// .route('/signup')
// .get(middleware1,getSignUp,middleware2)
// .post(postSignUp)

// authRouter
// .route('/login')
// .post(loginUser)


// function middleware1(req,res,next){
//     console.log('middleware1 encountered');
//     next(); // next means getSignUp function
// }
// function middleware2(req,res){
//     console.log('middleware2 encountered');
//     // next(); // next means getSignUp function
//     console.log('middlware 2 ended req/res cycle');
//     res.sendFile('/public/index.html',{root:__dirname});
// }

// function getSignUp(req, res, next) {
//     console.log('getSignUp called');
//     next();
//     // res.sendFile('/public/index.html',{root:__dirname});
// }

// sign up user
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if (user) {
            return res.json({
                message: "User signed up successfully.",
                data: user
            });
        } else {
            res.json({
                message: "error while  sign up."
            });
        }

        // let obj=req.body;
        // console.log('backend',user);

    }
    catch {
        res.json(err)({
            message: err.message
        })
    }
}

// login user
module.exports.login = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                // bcrypt -> compare
                if (user.password == data.password) {
                    let uid = user['_id'];//uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'user has logged in',
                        userDetails: data
                    })
                } else {
                    return res.json({
                        message: 'wrong credentials'
                    })
                }
            } else {
                return res.json({
                    message: 'user not found'
                })
            }
        } else {
            return res.json({
                message: 'empty field found'
            })
        }
    }
    catch (err) {
        return res.status('500').json({
            message: err.message
        })
    }

}

// isAuthorised -> to check the user's role [admin, user, restaurant owner, delivery boy]

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        } else {
            res.status(401).json({
                message: 'operation not allowed'
            })
        }
    }
}

//protect route

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else {
                return res.json({
                    message: 'please login again'
                })
            }
        }else{
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true){
                return res.redirect('/login');
            }
            //postman
            res.json({
                message:'please login'
            })
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        });
    }
}

// forget password
module.exports.forgetPassword = async function forgetPassword(req,res){
    let {email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
            // createResetToken is used to create a new token
            const resetToken=user.createResetToken();
            http://abc.com/resetpassword/resetToken
            `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
            //send email to the user
            //nodemailer
        }
        else{
            return res.json({
                message:"please signup"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

// reset password
module.exports.resetpassword = async function resetpassword(req,res){
    try{
        const token=req.params.token;
        let {password,confirmPassword}=req.body;
        const user = await userModel.findOne({resetToken:token});
        if(user){
            //resetPasswordHandler will update user's password in db
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
        }else{
            res.json({
                message:'user not found'
            })
        }
        res.json({
            message:'user password changed successfully'
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

// logout
module.exports.logout=function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"user logged out successfully"
    });
}

// module.exports=authRouter;

