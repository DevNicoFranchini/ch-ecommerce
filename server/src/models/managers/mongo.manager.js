import { convertToDto } from './../dto/user.dto.js';

class MongoContainer {
	constructor(model) {
		this.model = model;
	}

	async getById(id) {
		try {
			const response = await this.model.findById(id);
			const data = JSON.parse(JSON.stringify(response));
			const responseDto = convertToDto(data);
			return responseDto;
		} catch (error) {
			throw new Error(`HUBO UN ERROR AL BUSCAR POR ID. EL ERROR ES: ${error}`);
		}
	}

	async getAll() {
		try {
			const response = await this.model.find();
			const data = JSON.parse(JSON.stringify(response));
			const responseDto = convertToDto(data);
			return responseDto;
		} catch (error) {
			throw new Error(`HUBO UN ERROR AL BUSCAR TODOS. EL ERROR ES: ${error}`);
		}
	}

	async save(body) {
		try {
			const response = await this.model.create(body);
			const data = JSON.parse(JSON.stringify(response));
			return data;
		} catch (error) {
			throw new Error(`HUBO UN ERROR AL GUARDAR. EL ERROR ES: ${error}`);
		}
	}

	async updateById(body, id) {
		try {
			await this.model.findByIdAndUpdate(id, body, { new: true });
			return 'ACTUALIZADO SATISFACTORIAMENTE';
		} catch (error) {
			throw new Error(`HUBO UN ERROR AL ACTUALIZAR. EL ERROR ES: ${error}`);
		}
	}

	async deleteById(id) {
		try {
			await this.model.findByIdAndDelete(id);
			return 'ELIMINADO SATISFACTORIAMENTE';
		} catch (error) {
			throw new Error(`HUBO UN ERROR AL ELIMINAR. EL ERROR ES: ${error}`);
		}
	}

    async deleteAll() {
        try {
            await this.model.delete();
            return 'ELIMINADOS SATISFACTORIAMENTE';
        } catch (error) {
            throw new Error(`HUBO UN ERROR AL ELIMINAR TODOS. EL ERROR ES: ${error}`);
        }
    }
}

export { MongoContainer };