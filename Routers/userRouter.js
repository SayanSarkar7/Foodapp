const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const userRouter=express.Router();
// const protectRoute=require('./authHelper');
const {getUser,getAllUser,updateUser,deleteUser,getCookies,setCookies,updateProfileImage} = require('../controller/userController');
const {signup,login,isAuthorised,protectRoute,logout,forgetPassword,resetpassword}=require('../controller/authController');

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

// multer for file upload


userRouter
.route('forgetPassword')
.post(forgetPassword)

userRouter
.route('resetPassword/:token')
.post(resetpassword)

const multerStorage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, `user-${Date.now()}.jpeg`)
    }
})

const filter= function(req, file, cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new Error("Not an Image! please upload an image"), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
})

// multer for file upload
// upload->storage, filter

userRouter.post("/ProfileImage", upload.single('photo') ,updateProfileImage);
//get request
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile("D:/Test_dev/BackEnd/Foodapp/multer.html");
});

userRouter
.route('/logout')
.get(logout)

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