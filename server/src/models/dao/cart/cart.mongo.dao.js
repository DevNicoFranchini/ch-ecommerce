import mongoose from 'mongoose';

import { CartModel } from '../../db/cart.model.js';
import { MongoContainer } from '../../managers/mongo.manager.js';

class CartMongoDao extends MongoContainer {
	constructor(model) {
		super(model);
	}

	async existsProductInCartById(cartEmail, productId) {
		try {
			if (mongoose.isValidObjectId(productId)) {
				const cart = await CartModel.findOne({ email: cartEmail }).select().lean();
				const productsInCart = cart.products;

				const existsProductInCart = await productsInCart.find(
					(product) => product._id == productId
				);

				if (!(existsProductInCart == null)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch (error) {
			throw new Error(`HUBO UN ERROR AL VALIDAR SI EXISTE EL ID. EL ERROR ES: ${error}`);
		}
	}

	async updateProductInCartById(cartEmail, productId) {
		try {
			if (mongoose.isValidObjectId(productId)) {
				const cart = await CartModel.findOne({ email: cartEmail }).select().lean();
				const productsInCart = cart.products;

				const product = await productsInCart.find((product) => product._id == productId);
				
				const data = await CartModel.findOneAndUpdate(
					{ email: cartEmail, 'products._id': productId },
					{ $set: { 'products.$.cantidad': (product.cantidad += 1) } },
					{ new: true }
				);
				return data;
			}
		} catch (error) {
			throw new Error(`HUBO UN ERROR AL VALIDAR SI EXISTE EL ID. EL ERROR ES: ${error}`);
		}
	}
}

export { CartMongoDao };

/* const cart = await CartModel.findOne({ email: cartEmail }).select().lean();
				const productsInCart = cart.products;

				const productUpdated = await productsInCart.map((product) => {
					if (product._id == productId) {
						product.cantidad += 1;
					}
					return product;
				});
				return productUpdated; */
