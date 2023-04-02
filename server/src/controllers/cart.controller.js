import { existsProductById, getProductsById } from '../services/product.service.js';
import {
	existsCart,
	deleteCart,
	getCarts,
	getCartByEmail,
	saveCart,
	updateCartById,
	updateCartByEmail,
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

export const addProductCartController = async (req, res) => {
	const username = req.session.passport.user.username;
	const productId = req.params.id;
	try {
		const existCart = await existsCart(username);
		const existProduct = await existsProductById(productId);

		if (existCart && existProduct) {
			const product = await getProductsById(productId);

			const cart = await getCartByEmail(username);
			cart.products.push(product);

			const cartUpdated = await updateCartByEmail(cart, username);

			res.status(200).json({ cartUpdated });
		} else if (!existCart && existProduct) {
			const product = await getProductsById(productId);
			const newCart = await saveCart({
				products: [product],
				email: username,
			});
			res.status(200).json(newCart);
		} else if (!existProduct) {
			res.status(409).json({ message: `EL PRODUCTO NO EXISTE` });
		}
	} catch (error) {
		res
			.status(400)
			.json({ message: `HUBO UN ERROR AL ACTUALIZAR EL CARRITO. EL ERROR FUE: ${error}` });
	}
};
