import { UserModel } from './db/user.model.js';
import { CartModel } from './db/cart.model.js';
import { ProductModel } from './db/product.model.js';
import { MyMongoClient } from './clients/mongo.client.js';

export async function getApiDao(dbType) {
	let UserDaoContainer;
	let ProductDaoContainer;
	let CartDaoContainer;

	// PATRON FACTORY

	switch (dbType) {
		case 'MONGO':
			const { UserMongoDao } = await import('./dao/user/user.mongo.dao.js');
			const { ProductMongoDao } = await import('./dao/product/product.mongo.dao.js');
			const { CartMongoDao } = await import('./dao/cart/cart.mongo.dao.js');

			const client = new MyMongoClient();
			await client.connect();

			UserDaoContainer = new UserMongoDao(UserModel);
			ProductDaoContainer = new ProductMongoDao(ProductModel);
			CartDaoContainer = new CartMongoDao(CartModel);

			break;
		default:
			break;
	}
	return { UserDaoContainer, ProductDaoContainer, CartDaoContainer };
}
