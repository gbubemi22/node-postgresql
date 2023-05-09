import express from 'express';
const router = express.Router();

import partyController from '../controllers/partyController.js'




router
.route('/')
.post(partyController.createParty);


router
.route('/:userId')
.get(partyController.getOnePartByUserId);




router
.route('/:userId')
.delete(partyController.deleteEduInfo);


router
.route('/:userId')
.patch(partyController.updateEduInfo);



export default router;