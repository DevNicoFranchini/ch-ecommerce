import express from 'express';

import { isAdmin } from './../../middleware/admin.js';

import * as ProductController from './../../controllers/products.controller.js';

const router = express.Router();

router.get('/new', isAdmin, (req, res) => {
	const username = req.session.passport.user.username;
	res.render('newProduct', { username });
});

router.get('/', ProductController.getProductsController);
router.post('/new', isAdmin, ProductController.saveProductController);

export { router as ProductsRouter };
