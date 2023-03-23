import os from 'os';
import cluster from 'cluster';

import { UserDB, sessionDB } from './config/db.config.js';

import { app } from './app.js';
import { options } from './config/options.config.js';

const PORT = options.server.port;
const MODE = options.server.mode;
const mongoDBUrl = options.mongodb.mongousers;

// EXPRESS SERVER CONNECTION

if (MODE === 'CLUSTER' && cluster.isPrimary) {
	const numCPUS = os.cpus().length;

	for (let i = 0; i < numCPUS; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		cluster.fork();
	});
} else {
	const server = app.listen(PORT, () =>
		console.log(
			`Freddy, el servidor está corriendo en el puerto "${PORT}" en el proceso "${process.pid}"`
		)
	);
	server.on('error', (error) =>
		console.log(`Hubo un problema en el servidor. El error es: ${error}`)
	);
}

// DB CONNECTION

new UserDB(mongoDBUrl, 'Usuarios').connect();

// SESSION CONNECTION

sessionDB(app);
