import { options } from './../config/options.config.js';

const admin = options.server.admin;

const isAdmin = (req, res, next) => {
	const username = req.session.passport.user.username;
	if (username != admin) {
		res.status(403).render('unauthorized');
	} else {
		next();
	}
};

export { isAdmin };
