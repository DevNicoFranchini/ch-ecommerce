import os from 'os';
import cluster from 'cluster';

import { options } from './config/config.js';
import { app } from './app.js';

const PORT = options.server.port;
const MODE = options.server.mode;

// EXPRESS SERVER

if (MODE === 'CLUSTER' && cluster.isPrimary) {
	const numCPUS = os.cpus().length; // CPU CORES

	for (let i = 0; i < numCPUS; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		cluster.fork();
	});
} else {
	const server = app.listen(PORT, () =>
		console.log(
			`Freddy, el servidor está corriendo en el puerto ${PORT} en el proceso ${process.pid}`
		)
	);
	server.on('error', (error) =>
		console.log(`Hubo un problema en el servidor. El error es: ${error}`)
	);
}
