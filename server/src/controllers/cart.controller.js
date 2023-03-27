import { existsCart, getCarts, saveCart } from './../services/cart.service.js';

export const existsCartController = async (req, res, next) => {
	try {
		const username = req.session.passport.user.username;
		const exists = await existsCart(username);

		console.log('EMAIL CONTROLLER --> ', username);
		console.log('EXISTE EL EMAIL? --> ', exists);

		if (exists) {
			res.status(200).json({ message: `EL USUARIO YA TIENE CARRITO` });
		} else {
			const newCart = await saveCart({
				products: [
					{
						_id: '641fb0e6c478786bd93cd498',
						name: 'Galleta',
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
