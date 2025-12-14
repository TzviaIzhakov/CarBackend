import { ObjectId } from 'mongodb';

import { dbService } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';

async function query(filterBy = { carName: '', efficiency: 0, fastCharge: 0, price: 0, range: 0, topSpeed: 0, acceleration: 0 }) {
	try {
		const criteria = buildCriteria(filterBy);
		const collection = await dbService.getCollection('car');
		let cursor = collection.find(criteria);

		const cars = await cursor.toArray();
		return cars;
	} catch (err) {
		logger.error('cannot find cars', err);
		throw err;
	}
}

function buildCriteria(filterBy) {
	const criteria = {};

	if (filterBy.carName) {
		const regex = new RegExp(filterBy.carName, 'i');
		criteria.carName = { $regex: regex };
	}

	if (filterBy.efficiency && filterBy.efficiency > 0) {
		criteria.efficiency = { $lte: filterBy.efficiency };
	}

	if (filterBy.fastCharge && filterBy.fastCharge > 0) {
		criteria.fastCharge = { $lte: filterBy.fastCharge };
	}

	if (filterBy.price && filterBy.price > 0) {
		criteria.price = { $lte: filterBy.price };
	}

	if (filterBy.range && filterBy.range > 0) {
		criteria.range = { $lte: filterBy.range };
	}

	if (filterBy.topSpeed && filterBy.topSpeed > 0) {
		criteria.topSpeed = { $lte: filterBy.topSpeed };
	}

	if (filterBy.acceleration && filterBy.acceleration > 0) {
		criteria.acceleration = { $lte: filterBy.acceleration };
	}

	return criteria;
}

async function getById(carId) {
	try {
		const collection = await dbService.getCollection('car');
		const car = collection.findOne({ _id: new ObjectId(carId) });
		return car;
	} catch (err) {
		logger.error(`while finding car ${carId}`, err);
		throw err;
	}
}

async function remove(carId) {
	try {
		const collection = await dbService.getCollection('car');
		const res = await collection.deleteOne({ _id: new ObjectId(carId) });
		return res.deletedCount;
	} catch (err) {
		logger.error(`cannot remove car ${carId}`, err);
		throw err;
	}
}

async function add(car) {
	try {
		const collection = await dbService.getCollection('car');
		await collection.insertOne(car);
		return car;
	} catch (err) {
		logger.error('cannot insert car', err);
		throw err;
	}
}

async function update(car) {
	try {
		const { _id, ...carToUpdate } = car;
		const collection = await dbService.getCollection('car');
		const res = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: carToUpdate });
		if (res.matchedCount === 0) {
			return null;
		}
		return { _id, ...carToUpdate };
	} catch (err) {
		logger.error(`cannot update car ${car._id}`, err);
		throw err;
	}
}

export const carService = {
	remove,
	query,
	getById,
	add,
	update,
};
