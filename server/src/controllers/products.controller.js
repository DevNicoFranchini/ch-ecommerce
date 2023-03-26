import {
	saveProduct,
	getProducts,
	getProductsById,
	updateProductById,
	deleteProducts,
	deleteProductsById,
} from './../models/services/product.service.js';

export const getProductsController = async (req, res) => {
	try {
		const username = req.session.passport.user.username;
		const products = await getProducts();
		res.status(200).render('products', { products, username });
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const saveProductController = async (req, res) => {
	try {
		const username = req.session.passport.user.username;
		const product = await saveProduct(req.body);
		const products = await getProducts();
		res.status(200).render('products', { products, username });
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const updateProductController = async (req, res) => {
	try {
		const product = await updateById(req.body, req.params.id);
		const products = await getProducts();
		res.status(200).render('users', { products });
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};
