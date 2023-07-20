// WJqnF6nnelZRAJZL
const express = require('express');
const cookieParser = require('cookie-parser');
const userModel=require('./models/userModel.js')

const app=express();


// middleware function ->post,front ->json
app.use(express.json()); // global middleware
app.use(express.urlencoded({extended:true}));
app.listen(3000);
app.use(cookieParser());

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
                
const userRouter=require('./Routers/userRouter.js');
const authRouter=require('./Routers/authRouter.js');

// base route, router to use
app.use('/user',userRouter);
app.use('/auth',authRouter);



