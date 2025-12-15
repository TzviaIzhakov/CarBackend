import express from 'express';
import { log } from '../../middlewares/logger.middleware.js';
import { carController } from './car.controller.js';

export const carRoutes = express.Router();

carRoutes.get('/', log, carController.getCars);
carRoutes.get('/statistics', carController.getStatistics);
carRoutes.get('/:id', carController.getCarById);
carRoutes.post('/', carController.addCar);
carRoutes.put('/:id', carController.updateCar);
carRoutes.delete('/:id', carController.removeCar);
