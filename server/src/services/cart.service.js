import { getApiDao } from './../models/index.models.js';
import { options } from './../config/options.config.js';

const { CartDaoContainer } = await getApiDao(options.server.dbType);

export const existsCart = async (email) => {
	return await CartDaoContainer.existsEmail(email);
};

export const existsProductInTheCart = async (cartEmail, productId) => {
	return await CartDaoContainer.existsProductInCartById(cartEmail, productId);
};

export const saveCart = async (body) => {
	return await CartDaoContainer.save(body);
};

export const getCarts = async () => {
	return await CartDaoContainer.getAll();
};

export const getCartById = async (id) => {
	return await CartDaoContainer.getById(id);
};

export const getCartByEmail = async (email) => {
	return await CartDaoContainer.getByEmail(email);
};

export const updateCartById = async (body, id) => {
	return await CartDaoContainer.updateById(body, id);
};

export const updateCartByEmail = async (body, email) => {
	return await CartDaoContainer.updateByEmail(body, email);
};

export const updateProductInCart = async (cartEmail, productId) => {
	return await CartDaoContainer.updateProductInCartById(cartEmail, productId);
};

export const deleteCart = async (email) => {
	return await CartDaoContainer.deleteOne(email);
};

export const deleteCarts = async () => {
	return await CartDaoContainer.deleteAll();
};

export const deleteCartsById = async (id) => {
	return await CartDaoContainer.deleteById(id);
};
