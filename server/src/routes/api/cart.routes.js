import express from 'express';

import { isAdmin } from './../../middleware/admin.js';

import * as CartController from './../../controllers/cart.controller.js';

const router = express.Router();

// router.post('/new', CartController.saveCartController)
router.get('/', CartController.existsCartController);
router.get('/delete', CartController.deleteCartController);
router.get('/all-carts', isAdmin, CartController.getCartsController);

export { router as CartRouter };
