import os from 'os';
import cluster from 'cluster';

import { app } from './app.js';
import { logger } from './utils/logs/logger.js';
import { options } from './config/options.config.js';
import { UserDB, sessionDB } from './config/db.config.js';

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
		logger.warn(`EL PROCESO "${worker.id}" TUVO UN FALLO.`)
		cluster.fork();
	});
} else {
	const server = app.listen(PORT, () =>
		logger.info(
			`FREDDY, EL SERVIDOR ESTÁ CORRIENDO EN EL PUERTO "${PORT}" EN EL PROCESO "${process.pid}"`
		)
	);
	server.on('error', (error) =>
		logger.warn(`HUBO UN PROBLEMA EN EL SERVIDOR. EL ERROR ES: ${error}`)
	);
}

// DB CONNECTION

new UserDB(mongoDBUrl, 'USUARIOS').connect();

// SESSION CONNECTION

sessionDB(app);
