import express from 'express';
const router = express.Router();


import authController from '../controllers/authController.js'



router
.route('/elite/signup')
.post(authController.registerElite);

router
.route('/politician/signup')
.post(authController.registerPolitician);

router
.route('/login')
.post(authController.login);




export default router;