import session from 'express-session';
import MongoStore from 'connect-mongo';

import { options } from './options.config.js';

// SESSION CONFIG

const sessionDB = (app) => {
	app.use(
		session({
			store: MongoStore.create({
				mongoUrl: options.mongodb.mongourl,
				mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			}),
			secret: 'claveSecreta',
			resave: false,
			saveUninitialized: false,
		})
	);
};

export { sessionDB };
