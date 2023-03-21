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
	},
	mongodb: {
		mongousers:
			objArgs.env === 'TEST' ? process.env.USERS_TEST : process.env.USERS,
		mongosessions:
			objArgs.env === 'TEST' ? process.env.SESSIONS_TEST : process.env.SESSIONS,
		mongoproducts:
			objArgs.env === 'TEST' ? process.env.PRODUCTS_TEST : process.env.PRODUCTS,
		mongocarts:
			objArgs.env === 'TEST' ? process.env.CARTS_TEST : process.env.CARTS,
		mongoorders:
			objArgs.env === 'TEST' ? process.env.ORDERS_TEST : process.env.ORDERS,
	},
};
