import { getApiDao } from './../index.models.js';
import { options } from './../../config/options.config.js';

const { UserDaoContainer } = await getApiDao(options.server.dbType);

export const saveUser = async (body) => {
	return await UserDaoContainer.save(body);
};

export const getUsers = async () => {
	return await UserDaoContainer.getAll();
};

export const getUsersById = async (id) => {
	return await UserDaoContainer.getById(id);
};

export const deleteUsers = async () => {
	return await UserDaoContainer.deleteAll();
};

export const deleteUsersById = async (id) => {
	return await UserDaoContainer.deleteById(id);
};
