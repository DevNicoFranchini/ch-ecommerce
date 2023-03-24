import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema(
	{
		products: {
			type: [{ type: String, required: true }],
			required: true,
		},
		email: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const CartModel = mongoose.model(cartCollection, cartSchema);
