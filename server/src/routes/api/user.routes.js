import express from 'express';
import passport from 'passport';

import { isAdmin } from './../../middleware/admin.js';

import * as UserController from './../../controllers/user.controller.js';

import {
	loginStrategy,
	signupStrategy,
	serializeUser,
	deserializeUser,
} from './../../models/passport/passport.js';

import { logger } from './../../logs/logger.js';

loginStrategy();
signupStrategy();
serializeUser();
deserializeUser();

const router = express.Router();

// SIGNUP

router.get('/signup', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/api');
	} else {
		res.render('signup');
	}
});

router.post(
	'/signup',
	passport.authenticate('signup', {
		successRedirect: '/api',
		failureRedirect: '/api/users/signupError',
	}),
	(req, res) => {
		res.redirect('/api');
	}
);

// SIGNUP ERROR

router.get('/signupError', (req, res) => {
	res.render('signupError');
});

// LOGIN

router.get('/login', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/api');
	} else {
		res.render('login');
	}
});

router.post(
	'/login',
	passport.authenticate('login', {
		successRedirect: '../',
		failureRedirect: '/api/users/loginError',
	}),
	(req, res) => {
		res.redirect('/api');
	}
);

// LOGIN ERROR

router.get('/loginError', (req, res) => {
	res.render('loginError');
});

// LOGOUT

router.get('/logout', (req, res) => {
	const username = req.session.passport.user.username;
	req.logout((err) => {
		if (err) {
			logger.warn(err);
			return res.send('Hubo un error al cerrar sesión');
		}
		req.session.destroy();
		res.render('logout', { username });
	});
});

router.get('/all-users', isAdmin, UserController.getUsersController);

export { router as UserRouter };
