import {
	existsCart,
	deleteCart,
	getCarts,
	getCartByEmail,
	saveCart,
} from './../services/cart.service.js';

export const existsCartController = async (req, res, next) => {
	try {
		const username = req.session.passport.user.username;
		console.log('el username es --> ', req.session.passport.user.username);
		const exists = await existsCart(username);

		if (exists) {
			const cart = await getCartByEmail(username);
			res.status(200).json({ cart });
		} else {
			const newCart = await saveCart({
				products: [
					{
						_id: '641fb162c478786bd93cd49a',
						name: 'Torta',
						price: 10,
						thumbnail: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQUFBcUFB',
						description: 'Torta',
						category: 'Tortas',
						stock: 10,
					},
					{
						_id: '641fb0e6c478786bd93cd498',
						name: 'Galleta',
						price: 50,
						thumbnail: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQUFBcUFB',
						description: 'Galleta',
						category: 'Galletas',
						stock: 5,
					},
				],
				email: username,
			});
			res.json(newCart);
		}
	} catch (error) {
		res
			.status(400)
			.json({ message: `HUBO UN ERROR AL VERIFICAR SI EXISTE EL CARRITO. EL ERROR FUE: ${error}` });
	}
};

// export const saveToCartController = async (req, res, next) => {
//     try {
// 		const username = req.session.passport.user.username;
// 		const existsCart = await existsCart(username);
//         const existsProduct = await exists(req.body.name)

// 		console.log('EMAIL CONTROLLER --> ', username);
// 		console.log('EXISTE EL EMAIL? --> ', existsCart);

// 		if (existsCart && existsProduct) {
//             const product = await saveProduct(req.body);
// 		} else {
// 			next();
// 		}
// 	} catch (error) {
// 		res
// 			.status(400)
// 			.json({ message: `HUBO UN ERROR AL AÑADIR EL PRODUCTO AL CARRITO. EL ERROR FUE: ${error}` });
// 	}
// };

export const getCartsController = async (req, res) => {
	try {
		const username = req.session.passport.user.username;
		const carts = await getCarts();
		if (carts.length !== 0) {
			res.status(200).json(carts);
		} else {
			res.status(200).json({ message: 'NO HAY CARRITOS' });
		}
	} catch (error) {
		res.status(400).json({ message: `HUBO UN ERROR. EL ERROR FUE: ${error}` });
	}
};

export const deleteCartController = async (req, res) => {
	try {
		await deleteCart(req.session.passport.user.username);
		res.status(200).json({ message: `CARRITO ELIMINADO SATISFACTORIAMENTE` });
	} catch (error) {
		res
			.status(400)
			.json({ message: `HUBO UN ERROR AL ELIMINAR EL CARRITO. EL ERROR FUE: ${error}` });
	}
};
