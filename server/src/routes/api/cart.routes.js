import express from 'express';

import { isAdmin } from './../../middleware/admin.js';

import * as CartController from './../../controllers/cart.controller.js';

const router = express.Router();


// router.post('/new', CartController.saveCartController)
router.post('/', CartController.existsCartController);

export { router as CartRouter };
