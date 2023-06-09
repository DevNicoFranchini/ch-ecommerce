import express from 'express';

import { UserRouter } from './api/user.routes.js';
import { ProductsRouter } from './api/products.routes.js';
import { CartRouter } from './api/cart.routes.js';

const router = express.Router();

// GET

router.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/api/products');
	} else {
		res.redirect('/api/users/login');
	}
});

router.use('/users', UserRouter);
router.use('/products', ProductsRouter);
router.use('/cart', CartRouter);

export { router as apiRouter };
