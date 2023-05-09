import express from 'express';
const router = express.Router();


import educationController from '../controllers/educationController.js';


router
.route('/')
.post(educationController.createEduInfo);


router
.route('/:userId')
.get(educationController.getEduInfo);

router
.route('/:userId')
.delete(educationController.deleteEduInfo);



router
.route('/:userId')
.patch(educationController.updateEduInfo);



export default router;


