import { existsProductById, getProductsById } from '../services/product.service.js';
import {
	existsCart,
	deleteCart,
	getCarts,
	getCartByEmail,
	saveCart,
	updateCartById,
	updateCartByEmail,
	existsProductInTheCart,
	updateProductInCart,
	deleteProductInCart,
} from './../services/cart.service.js';

export const existsCartController = async (req, res, next) => {
	try {
		const username = req.session.passport.user.username;
		const exists = await existsCart(username);

		if (exists) {
			const cart = await getCartByEmail(username);
			if (cart.products.length == 0) {
				res.status(200).json({ message: 'EL CARRITO ESTÁ VACÍO' });
			} else {
				res.status(200).json({ cart });
			}
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
			const cart = await getCartByEmail(username);
			const existsProductInCart = await existsProductInTheCart(username, productId);

			if (existsProductInCart) {
				const cartUpdated = await updateProductInCart(username, productId);
				res.status(200).json({ cartUpdated });
			} else {
				const product = await getProductsById(productId);
				cart.products.push({ name: product.name, cantidad: 1, _id: productId });
				const cartUpdated = await updateCartByEmail(cart, username);
				res.status(200).json({ cartUpdated });
			}
		} else if (!existCart && existProduct) {
			const product = await getProductsById(productId);
			const newCart = await saveCart({
				products: [{ name: product.name, cantidad: 1, _id: productId }],
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

export const deleteProductCartController = async (req, res) => {
	const username = req.session.passport.user.username;
	const productId = req.params.id;

	try {
		const existCart = await existsCart(username);
		const existProduct = await existsProductById(productId);

		if (existCart && existProduct) {
			const existsProductInCart = await existsProductInTheCart(username, productId);

			if (existsProductInCart) {
				const cartUpdated = await deleteProductInCart(username, productId);
				if (cartUpdated.products.length == 0) {
					await deleteCart(username);
					res.status(200).json({ message: 'EL CARRITO ESTÁ VACÍO' });
				} else {
					res.status(200).json({ cartUpdated });
				}
			} else {
				res.status(409).json({ message: `EL PRODUCTO NO EXISTE EN EL CARRITO` });
			}
		} else if (!existCart) {
			res.status(409).json({ message: `EL CARRITO ESTÁ VACÍO` });
		} else if (!existProduct) {
			res.status(409).json({ message: `EL PRODUCTO NO EXISTE` });
		}
	} catch (error) {
		res
			.status(400)
			.json({ message: `HUBO UN ERROR AL ACTUALIZAR EL CARRITO. EL ERROR FUE: ${error}` });
	}
};
