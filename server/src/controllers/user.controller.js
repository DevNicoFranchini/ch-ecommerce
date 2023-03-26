import {
	saveUser,
	getUsers,
	getUsersById,
	updateById,
	deleteUsers,
	deleteUsersById,
} from './../services/user.service.js';

export const getUsersController = async (req, res) => {
	try {
		const users = await getUsers();
		res.status(200).render('users', { users });
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const saveUserController = async (req, res) => {
	try {
		const user = await saveUser(req.body);
		res.status(200).json({ data: user });
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const updateUserController = async (req, res) => {
	try {
		const user = await updateById(req.body, req.params.id);
		const users = await getUsers();
		res.status(200).render('users', { users });
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};
