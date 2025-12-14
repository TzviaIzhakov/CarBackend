import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';

import 'dotenv/config.js';

import { logger } from './services/logger.service.js';
logger.info('server.js loaded...');

const app = express();
const server = http.createServer(app);

// Express App Config
app.use(cookieParser());
app.use(express.json());

// Configuring CORS
const corsOptions = {
	origin: [
		'http://127.0.0.1:5173',
		'http://localhost:5173',
		'http://127.0.0.1:3030',
		'http://localhost:3030',
		'http://127.0.0.1:3000',
		'http://localhost:3000',
	],
	credentials: true,
};
app.use(cors(corsOptions));

import { carRoutes } from './api/car/car.routes.js';

app.use('/api/car', carRoutes);

const port = process.env.PORT || 3030;

server.listen(port, () => {
	logger.info('Server is running on port: ' + port);
});
