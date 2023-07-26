//mongoDB
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const emailValidator=require('email-validator');

const db_link="mongodb+srv://Sayan:12345678Sayan@cluster0.wseih1d.mongodb.net/foodapp?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('user db connected');
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
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:6,
        validate:function(){
            return this.confirmPassword==this.password
        } 
    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
});

// hooks

// userSchema.pre('save',function(){
//     console.log('before saving in db',this);
// });
// userSchema.post('save',function(doc){
//     console.log('before saving in db',doc);
// });

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     // console.log(hashedString);
//     this.password=hashedString;
// })

userSchema.methods.createResetToken=function(){
    // crypto -> npm package to get new 32 bit token
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}

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
