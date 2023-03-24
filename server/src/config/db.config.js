import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { options } from './options.config.js';
import { logger } from '../logs/logger.js';

// DB CONNECTION

class UserDB {
	constructor(url, dbname) {
		this.url = url;
		this.dbname = dbname;
	}

	async connect() {
		try {
			await mongoose.connect(this.url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			logger.info(`CONEXIÓN A LA BASE DE DATOS "${this.dbname}" DE MANERA EXITOSA`);
		} catch (error) {
			logger.warn(`HUBO UN ERROR CONECTÁNDOSE A LA BASE. EL ERROR ES: ${error}`);
		}
	}

	async disconnect() {
		try {
			await mongoose.disconnect();
			logger.info('DESCONEXIÓN DE LA BASE DE DATOS DE MANERA EXITOSA');
		} catch (error) {
			logger.warn(`HUBO UN ERROR DESCONECTÁNDOSE DE LA BASE. EL ERROR ES: ${error}`);
		}
	}
}

// SESSION CONFIG

const sessionDB = (app) => {
	app.use(
		session({
			store: MongoStore.create({
				mongoUrl: options.mongodb.mongosessions,
				mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
				// collectionName: 'test',
			}),
			secret: 'claveSecreta',
			resave: false,
			saveUninitialized: false,
		})
	);
};

export { UserDB, sessionDB };
