import mongoose from 'mongoose';
import { productSchema } from './product.model.js';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema(
	{
		products: {
			type: [{ type: productSchema, required: true }],
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const CartModel = mongoose.model(cartCollection, cartSchema);
