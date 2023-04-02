import mongoose from 'mongoose';
import { productSchema } from './product.model.js';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema(
	{
		products: {
			type: [
				{
					name: {
						type: String,
						required: true,
					},
					cantidad: {
						type: Number,
						required: true,
					},
				},
				{
					_id: String,
					timestamps: true,
				},
			],
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{
		_id: String,
		timestamps: true,
	}
);

export const CartModel = mongoose.model(cartCollection, cartSchema);
