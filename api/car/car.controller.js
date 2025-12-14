import { carService } from './car.service.js';
import { logger } from '../../services/logger.service.js';

export const getCars = async (req, res) => {
	try {
		const { carName, efficiency, fastCharge, price, range, topSpeed, acceleration } = req.query;
		const filterBy = {
			carName: carName || '',
			efficiency: efficiency ? +efficiency : 0,
			fastCharge: fastCharge ? +fastCharge : 0,
			price: price ? +price : 0,
			range: range ? +range : 0,
			topSpeed: topSpeed ? +topSpeed : 0,
			acceleration: acceleration ? +acceleration : 0,
		};

		const cars = await carService.query(filterBy);
		res.send(cars);
	} catch (err) {
		logger.error('Failed to get cars', err);
		res.status(500).send({ err: 'Failed to get cars' });
	}
};

export const getCarById = async (req, res) => {
	try {
		const { id } = req.params;
		const car = await carService.getById(id);
		if (!car) {
			return res.status(404).send({ err: 'Car not found' });
		}
		res.send(car);
	} catch (err) {
		logger.error('Failed to get car', err);
		res.status(500).send({ err: 'Failed to get car' });
	}
};

export const addCar = async (req, res) => {
	try {
		const { carName, efficiency, fastCharge, price, range, topSpeed, acceleration } = req.body;
		if (!carName || price < 0 || range < 0 || efficiency < 0 || fastCharge < 0 || topSpeed < 0 || acceleration < 0) {
			return res.status(400).send({ err: 'Invalid car data' });
		}

		const car = {
			carName,
			efficiency: efficiency || 0,
			fastCharge: fastCharge || 0,
			price: price || 0,
			range: range || 0,
			topSpeed: topSpeed || 0,
			acceleration: acceleration || 0,
		};

		const savedCar = await carService.add(car);
		return res.status(201).send(savedCar);
	} catch (err) {
		logger.error('Failed to add car', err);
		res.status(500).send({ err: 'Failed to add car' });
	}
};

export const updateCar = async (req, res) => {
	try {
		const { carName, efficiency, fastCharge, price, range, topSpeed, acceleration } = req.body;
		const car = {
			_id: req.params.id,
			carName,
			efficiency: efficiency || 0,
			fastCharge: fastCharge || 0,
			price: price || 0,
			range: range || 0,
			topSpeed: topSpeed || 0,
			acceleration: acceleration || 0,
		};
		const savedCar = await carService.update(car);
		if (!savedCar) {
			return res.status(404).send({ err: 'Car not found' });
		}
		return res.send(savedCar);
	} catch (err) {
		logger.error('Failed to update car', err);
		res.status(500).send({ err: 'Failed to update car' });
	}
};

export const removeCar = async (req, res) => {
	try {
		const { id } = req.params;
		const car = await carService.getById(id);
		if (!car) {
			return res.status(404).send({ err: 'Car not found' });
		}

		const deletedCount = await carService.remove(id);
		if (!deletedCount) {
			return res.status(404).send({ err: 'Car not found' });
		}

		return res.status(204).send();
	} catch (err) {
		logger.error('Failed to remove car', err);
		res.status(500).send({ err: 'Failed to remove car' });
	}
};

export const getLasCars = async (req, res) => {
	try {
		const { cars } = req.query;
		const lastCars = await carService.getLastCars(cars);

		return res.send(lastCars);
	} catch (err) {
		logger.error('Failed to get recent events', err);
		return res.status(500).send({ err: 'Failed to get recent events' });
	}
};
