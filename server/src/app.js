import express from 'express';
import handlebars from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { URL } from 'url';
import { sessionDB } from './config/db.config.js';
import { apiRouter } from './routes/index.routes.js';
import { logger, infoLogger } from './logs/logger.js';

import {
	signupStrategy,
	loginStrategy,
	serializeUser,
	deserializeUser,
} from './models/passport/passport.js';

const app = express();
const __dirname = new URL('.', import.meta.url).pathname;

// SESSION CONNECTION

sessionDB(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + './public'));

app.use(compression());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:8080',
		methods: ['GET'],
	})
);

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('views', './src/public/views');
app.set('view engine', 'hbs');

app.use(passport.initialize());
app.use(passport.session());

app.use(infoLogger);

loginStrategy();
signupStrategy();
serializeUser();
deserializeUser();

// ROUTES

app.use('/api', apiRouter);
app.get('*', (req, res) => {
	logger.warn(`RUTA: ${req.path} INEXISTENTE. PETICION: ${req.method}`);
	res.redirect('/api');
});

export { app };
