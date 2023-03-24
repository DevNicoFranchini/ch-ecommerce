import * as dotenv from 'dotenv';
import ParsedArgs from 'minimist';

dotenv.config();

const objArgs = ParsedArgs(process.argv.slice(2), {
	alias: {
		p: 'port',
		m: 'mode',
		e: 'env',
	},
	default: {
		port: process.env.PORT || 8080,
		mode: process.env.MODE || 'FORK',
		env: process.env.ENV || 'TEST',
	},
});

export const options = {
	server: {
		port: objArgs.port,
		mode: objArgs.mode,
		node_env: objArgs.env,
		dbType: process.env.DB_TYPE || 'MONGO',
		admin: process.env.MAIL || false,
	},
	mongodb: {
		mongourl: objArgs.env === 'TEST' ? process.env.CH_BACKEND_TEST : process.env.CH_BACKEND,
	},
};
