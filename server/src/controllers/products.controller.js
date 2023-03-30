import {
	saveProduct,
	getProducts,
	getProductsById,
	getProductsByCategory,
	updateProductById,
	deleteProducts,
	deleteProductsById,
	existsProduct,
} from './../services/product.service.js';

export const getProductsController = async (req, res) => {
	const username = req.session.passport.user.username;
	try {
		const products = await getProducts();
		res.status(200).render('products', { products, username });
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const getProductsByIdController = async (req, res) => {
	const username = req.session.passport.user.username;
	const id = req.params.id;
	try {
		const products = await getProductsById(id);
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const getProductsByCategoryController = async (req, res) => {
	const username = req.session.passport.user.username;
	const category = req.params.category;
	try {
		const products = await getProductsByCategory(category);
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const saveProductController = async (req, res, next) => {
	const username = req.session.passport.user.username;
	try {
		const exists = await existsProduct(req.body.name);

		if (exists) {
			res.status(409).json({ message: `EL PRODUCTO CON ESE NOMBRE YA EXISTE` });
		} else {
			const product = await saveProduct(req.body);
			const products = await getProducts();
			res.status(200).render('products', { products, username });
		}
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR AL GUARDAR. EL ERROR FUE: ${error}` });
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
