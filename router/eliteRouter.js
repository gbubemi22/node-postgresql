import express from 'express';
const router = express.Router();




import elitesController from '../controllers/eliteController.js';



router
     .route('/politicians')
     .get(elitesController.getAllPolitician);




router
     .route('/elites')
     .get(elitesController.getAllElites)



router
     .route('/:id')
     .get(elitesController.getOneElite)



router
     .route('/:id')
     .delete(elitesController.deleteElite)


router
     .route('/:id')
     .patch(elitesController.updateElite)

export default router;