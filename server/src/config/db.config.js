import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { options } from './options.config.js';

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
			console.log(`Conexión a la base de datos "${this.dbname}" de manera exitosa`);
		} catch (error) {
			console.error(`Hubo un error conectándose a la base. El error es: ${error}`);
		}
	}

	async disconnect() {
		try {
			await mongoose.disconnect();
			console.log('Desconexión de la base de datos de manera exitosa');
		} catch (error) {
			console.error(`Hubo un error desconectándose de la base. El error es: ${error}`);
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
			saveUninitialized: true,
		})
	);
};

export { UserDB, sessionDB };
