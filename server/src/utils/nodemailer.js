import { createTransport } from 'nodemailer';
import { logger } from './../logs/logger.js';
import { options } from './../config/options.config.js';

const MAIL = options.nodemailer.mail;
const PASS = options.nodemailer.pass;

export const sendMail = async (newUser) => {
	const transporter = createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: MAIL,
			pass: PASS,
		},
	});

	const mailOptionsOwner = {
		from: 'Ecommerce Backend',
		to: MAIL,
		subject: '¡Nuevo registro en tu ecommerce!',
		html: `<h1>¡Felicitaciones, tienes un nuevo usuario!</h1><p> ${newUser.name} ${newUser.lastname} (${newUser.email}) se ha registrado correctamente.</p>`,
	};

	const mailOptionsNewUser = {
		from: MAIL,
		to: newUser.email,
		subject: '¡Bienvenido/a al ecommerce!',
		html: `<h1>¡Bienvenido/a ${newUser.name}!</h1><p>Ya puedes empezar a usar nuestros servicios.</p>`,
	};

	try {
		await transporter.sendMail(mailOptionsOwner);
		await transporter.sendMail(mailOptionsNewUser);
	} catch (error) {
		logger.warn(err);
	}
};
