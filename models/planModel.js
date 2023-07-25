// connect mongodb through mongoose
//mongoDB
const mongoose=require('mongoose');

const db_link="mongodb+srv://Sayan:12345678Sayan@cluster0.wseih1d.mongodb.net/foodapp?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
});

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'plan name should not exceed 20 characters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        },'discount should not exceed price']
    }
});


// model
const planModel=mongoose.model('planModel',planSchema);

// (async function createPlan(){
//     let planObj={
//         name:'SuperFood3',
//         duration:30,
//         price:1000,
//         ratingAverage:5,
//         discount:20
//     }
//     // let data = await planModel.create(planObj);
//     // console.log(data);
//     const doc = new planModel(planObj);
//     await doc.save();
// })();


module.exports=planModel;

