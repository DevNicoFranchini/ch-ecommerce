import mongoose from 'mongoose';

import { logger } from './../../logs/logger.js';
import { options } from './../../config/options.config.js';

class MyMongoClient {
	constructor() {
		this.client = mongoose;
	}

	async connect() {
		try {
			this.client.set('strictQuery', false);
			await this.client.connect(options.mongodb.mongousers, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			logger.info(`CONEXIÓN A LA BASE DE DATOS DE MANERA EXITOSA`);
		} catch (error) {
			logger.warn(`HUBO UN ERROR CONECTÁNDOSE A LA BASE. EL ERROR ES: ${error}`);
		}
	}

	async disconnect() {
		try {
			await this.client.connection.close();
			logger.info('DESCONEXIÓN DE LA BASE DE DATOS DE MANERA EXITOSA');
		} catch (error) {
			logger.warn(`HUBO UN ERROR DESCONECTÁNDOSE DE LA BASE. EL ERROR ES: ${error}`);
		}
	}
}

export { MyMongoClient };
