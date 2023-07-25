const express=require('express');
const { protectRoute, isAuthorised } = require('../controller/authController');
const planRouter = express.Router();
const {getPlan,getAllPlans,createPlan,updatePlan,deletePlan, top3Plans}=require('../controller/planController')

//all plans
planRouter.route('/allPlans')
.get(getAllPlans)

// own plan -> logged in necessary
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

// admin and restaurant owner can only create, update or delete plans
planRouter.use(isAuthorised(['admin','restauranowner']));

planRouter
.route('/crudPlan')
.post(createPlan)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter
.route('/top3')
.get(top3Plans)

module.exports=planRouter;
