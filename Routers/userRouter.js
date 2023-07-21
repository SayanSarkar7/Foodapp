const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter=express.Router();
const protectRoute=require('./authHelper');
const {getUsers,getUserById,postUser,updateUser,deleteUser,getCookies,setCookies} = require('../controller/userController');

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




module.exports=userRouter;