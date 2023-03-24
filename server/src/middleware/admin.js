import { options } from './../config/options.config.js';

const admin = options.server.admin;

const isAdmin = (req, res, next) => {
	const username = req.session.passport.user.username;
	if (username != admin) {
		res.status(403).json({
			error: -1,
			description: {
				route: req.path,
				method: req.method,
				msg: 'Unauthorized',
			},
		});
	} else {
		next();
	}
};

export { isAdmin };
