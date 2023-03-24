class UserDto {
	constructor({ name, lastname, email }) {
		this.username = `${name} ${lastname}`;
		this.email = email;
	}
}

export const convertToDto = (users) => {
	if (Array.isArray(users)) {
		const newData = users.map((user) => new UserDto(user));
		return newData;
	} else {
		const newData = new UserDto(users);
		return newData;
	}
};
