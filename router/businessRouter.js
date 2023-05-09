import express from 'express';
const router = express.Router();

import businessController from '../controllers/businessController.js';


router
.route('/')
.post(businessController.createbusiness)


router
.route('/')
.get(businessController.getOneBusinessByUserId)



router
.route('/')
.patch(businessController.updateEduInfo)


router
.route('/')
.delete(businessController.deleteBussnessInfo)


export default router;