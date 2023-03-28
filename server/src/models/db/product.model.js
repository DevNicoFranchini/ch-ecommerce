import mongoose from 'mongoose';

const productCollection = 'products';

export const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		isAvailable: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

export const ProductModel = mongoose.model(productCollection, productSchema);
