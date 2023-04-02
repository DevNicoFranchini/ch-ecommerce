import express from 'express';

import { isAdmin } from './../../middleware/admin.js';

import * as CartController from './../../controllers/cart.controller.js';

const router = express.Router();

router.get('/', CartController.existsCartController);
router.delete('/delete', CartController.deleteCartController);
router.post('/add/:id', CartController.addProductCartController);
router.get('/all-carts', isAdmin, CartController.getCartsController);

export { router as CartRouter };
