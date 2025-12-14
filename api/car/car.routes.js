import express from 'express';
import { log } from '../../middlewares/logger.middleware.js';
import { getCars, getCarById, addCar, updateCar, removeCar } from './car.controller.js';

export const carRoutes = express.Router();

carRoutes.get('/', log, getCars);
carRoutes.get('/:id', getCarById);
carRoutes.post('/', addCar);
carRoutes.put('/:id', updateCar);
carRoutes.delete('/:id', removeCar);
// carRoutes.delete('/recent', getRecentCars);
