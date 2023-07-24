const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter=express.Router();
const protectRoute=require('./authHelper');
const {getUser,getAllUser,updateUser,deleteUser,getCookies,setCookies} = require('../controller/userController');

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

// /user/1
// params
// app.get('/user/:id',)

// profile page
app.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)


// admin specific function/midddleware
application.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)



module.exports=userRouter;