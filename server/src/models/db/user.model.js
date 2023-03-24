import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model(userCollection, userSchema);
