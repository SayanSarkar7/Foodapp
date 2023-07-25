const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter=express.Router();
// const protectRoute=require('./authHelper');
const {getUser,getAllUser,updateUser,deleteUser,getCookies,setCookies} = require('../controller/userController');
const {signup,login,isAuthorised,protectRoute}=require('../controller/authController');

// mini app
// userRouter
// .route('/')
// .get(protectRoute, getUsers) // path specefic middleware
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser)



// userRouter
// .route("/getCookies")
// .get(getCookies)

// userRouter
// .route("/setCookies")
// .get(setCookies)

// user options
userRouter
.route('/:id')
// .get(getUserById)
.patch(updateUser)
.delete(deleteUser)
// app.get('/user',)
// app.post('/user',);
// // update -> patch
// app.patch('/user',)
// // Delete
// app.delete('/user',);

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)
// /user/1
// params
// app.get('/user/:id',)

userRouter
.route('forgetPassword')
.post(forgetPassword)

userRouter
.route('resetPassword/:token')
.post(resetPassword)

// profile page
userRouter.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)


// admin specific function/midddleware
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)



module.exports=userRouter;