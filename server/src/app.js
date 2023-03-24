import express from 'express';

// import passport from 'passport';

import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

// import { normalize, schema } from 'normalizr';

import { apiRouter } from './routes/index.routes.js';
// import { logger } from './../logs/logger.js';
// import { MessagesContainer } from './controllers/messages.controller.js';

// import {
// 	signupStrategy,
// 	loginStrategy,
// 	serializeUser,
// 	deserializeUser,
// } from './persistence/passport/passport.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:8080',
		methods: ['GET'],
	})
);

// app.use(passport.initialize());
// app.use(passport.session());

// loginStrategy();
// signupStrategy();
// serializeUser();
// deserializeUser();

app.use('/', apiRouter);

// const messagesApi = new MessagesContainer('./src/files/messages.txt');

// Logger
// const infoLogger = (req, res, next) => {
// 	logger.info(`ruta : ${req.path}, peticion : ${req.method}`);
// 	next();
// };

// app.use(infoLogger);
// app.get('/*', (req, res) => {
// 	logger.warn(`Ruta: ${req.path} inexistente. Peticion: ${req.method}`);
// });

// Normalización
// const authorSchema = new schema.Entity('authors', {});
// const msgSchema = new schema.Entity('mensajes', { author: authorSchema });
// const chatSchema = new schema.Entity(
// 	'chat',
// 	{
// 		mensajes: [msgSchema],
// 	},
// 	{ idAttribute: 'id' }
// );

// Aplicar la normalización
// const normalizeData = (data) => {
// 	const normalizedData = normalize(
// 		{
// 			id: 'chatHistory',
// 			mensajes: data,
// 		},
// 		chatSchema
// 	);
// 	return normalizedData;
// };

// const normalizeMessages = async () => {
// 	const results = await messagesApi.getAll();
// 	const normalizedMsgs = normalizeData(results);
// 	return normalizedMsgs;
// };

export { app };
