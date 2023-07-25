const express=require('express');
const { protectRoute, isAuthorised } = require('../controller/authController');
const planRouter = express.Router();
const {protectRoute} = require('../controller/authController');


//all plans
planRouter.route('/allPlans')
.get(getAllPlans)

// own plan -> logged in necessary
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

// admin and restaurant owner can only create, update or delete plans
planRouter.use(isAuthorised['admin','restauranowner']);

planRouter
.route('/crudPlan')
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)
