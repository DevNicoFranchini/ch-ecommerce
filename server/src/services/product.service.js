import { getApiDao } from './../models/index.models.js';
import { options } from './../config/options.config.js';

const { ProductDaoContainer } = await getApiDao(options.server.dbType);

export const saveProduct = async (body) => {
	return await ProductDaoContainer.save(body);
};

export const getProducts = async () => {
	return await ProductDaoContainer.getAll();
};

export const getProductsById = async (id) => {
	return await ProductDaoContainer.getById(id);
};

export const getProductsByCategory = async (category) => {
	return await ProductDaoContainer.getByCategory(category);
};

export const updateProductById = async (body, id) => {
	return await ProductDaoContainer.updateById(body, id);
};

export const deleteProducts = async () => {
	return await ProductDaoContainer.deleteAll();
};

export const deleteProductsById = async (id) => {
	return await ProductDaoContainer.deleteById(id);
};

export const existsProduct = async (name) => {
	return await ProductDaoContainer.exists(name);
};

export const existsProductById = async (id) => {
	return await ProductDaoContainer.existsId(id);
};
