import {
	existsCart,
	deleteCart,
	getCarts,
	getCartByEmail,
	saveCart,
} from './../services/cart.service.js';

export const existsCartController = async (req, res, next) => {
	try {
		const username = req.session.passport.user.username;
		const exists = await existsCart(username);

		if (exists) {
			const cart = await getCartByEmail(username);
			res.status(200).json({ cart });
		} else {
			res.status(200).json({ message: 'EL CARRITO ESTÁ VACÍO' });
		}
	} catch (error) {
		res
			.status(400)
			.json({ message: `HUBO UN ERROR AL VERIFICAR SI EXISTE EL CARRITO. EL ERROR FUE: ${error}` });
	}
};

export const getCartsController = async (req, res) => {
	try {
		const username = req.session.passport.user.username;
		const carts = await getCarts();
		if (carts.length !== 0) {
			res.status(200).json(carts);
		} else {
			res.status(200).json({ message: 'NO HAY CARRITOS' });
		}
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const deleteCartController = async (req, res) => {
	const username = req.session.passport.user.username;
	try {
		await deleteCart(username);
		res.status(200).json({ message: `CARRITO ELIMINADO SATISFACTORIAMENTE` });
	} catch (error) {
		res
			.status(400)
			.json({ message: `HUBO UN ERROR AL ELIMINAR EL CARRITO. EL ERROR FUE: ${error}` });
	}
};
