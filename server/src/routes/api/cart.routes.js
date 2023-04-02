import express from 'express';

import { isAdmin } from './../../middleware/admin.js';

import * as CartController from './../../controllers/cart.controller.js';

const router = express.Router();

router.get('/', CartController.existsCartController);
router.get('/add/:id', CartController.addProductCartController);
router.get('/delete', CartController.deleteCartController);
router.get('/delete/:id', CartController.deleteProductCartController);
router.get('/all-carts', isAdmin, CartController.getCartsController);

export { router as CartRouter };
