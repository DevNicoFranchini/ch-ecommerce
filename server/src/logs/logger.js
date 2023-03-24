import log4js from 'log4js';

// LOG4JS CONFIGURATION

log4js.configure({
	appenders: {
		console: { type: 'console' },
		errorFile: { type: 'file', filename: './src/logs/messages/error.log' },
		warningFile: { type: 'file', filename: './src/logs/messages/warn.log' },

		loggerConsole: {
			type: 'logLevelFilter',
			appender: 'console',
			level: 'info',
		},
		loggerErrors: {
			type: 'logLevelFilter',
			appender: 'errorFile',
			level: 'error',
		},
		loggerWarning: {
			type: 'logLevelFilter',
			appender: 'warningFile',
			level: 'warn',
		},
	},
	categories: {
		default: {
			appenders: ['loggerConsole', 'loggerErrors', 'loggerWarning'],
			level: 'all',
		},
	},
});

const logger = log4js.getLogger();

// INFO LOGGER

const infoLogger = (req, res, next) => {
	logger.info(`RUTA: ${req.path} --- PETICION: ${req.method}`);
	next();
};

export { logger, infoLogger };
