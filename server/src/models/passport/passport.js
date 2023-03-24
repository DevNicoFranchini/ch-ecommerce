import passport from 'passport';
import bCrypt from 'bcrypt';

import { Strategy as LocalStrategy } from 'passport-local';

import { logger } from './../../logs/logger.js';
import { UserModel } from './../db/user.model.js';

const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

const createHash = (password) => {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// LOGIN STRATEGY

const loginStrategy = () => {
	passport.use(
		'login',
		new LocalStrategy(async (username, password, done) => {
			logger.info("NUEVO INICIO DE SESION")
			let user = await UserModel.findOne({ email: username });

			if (!user) {
				console.log(`User not found with username: ${username}`);
				return done(null, false, { message: 'User not found' });
			}

			if (!isValidPassword(user, password)) {
				console.log('Invalid password');
				return done(null, false, { message: 'Password incorrect' });
			}

			done(null, user);
		})
	);
};

// SIGNUP STRATEGY

const signupStrategy = () => {
	passport.use(
		'signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				let user = await UserModel.findOne({ username: username });

				if (user) {
					logger.warn(`EL USUARIO ${email} YA EXISTE`);
					return done(null, false, { message: 'EL USUARIO YA EXISTE' });
				}

				const newUser = new UserModel({
					name: req.body.name,
					lastname: req.body.lastname,
					email: username,
					password: createHash(password),
				});

				await newUser.save();

				logger.info("NUEVO REGISTRO")

				return done(null, req.body);
			}
		)
	);
};

// SERIALIZE USER

const serializeUser = () => {
	passport.serializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, {
				id: user['_id'],
				username: user.email,
			});
		});
	});
};

// DESERIALIZE USER

const deserializeUser = () => {
	passport.deserializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, user);
		});
	});
};

export { loginStrategy, signupStrategy, serializeUser, deserializeUser };
