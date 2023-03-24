import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema(
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
	},
	{
		timestamps: true,
	}
);

export const ProductModel = mongoose.model(productCollection, productSchema);
