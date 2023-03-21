import { useState, createContext, useContext, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    setUser({ name: "", email: "", phone: "" });
  }, []);

  // Agregar producto
  const addProduct = (product) => {
    const indexProduct = cart.findIndex((prod) => prod.id === product.id);
    if (indexProduct === -1) {
      setCart([...cart, product]);
    } else {
      const cantidadvieja = cart[indexProduct].cantidad;
      cart[indexProduct].cantidad = cantidadvieja + product.cantidad;
      setCart([...cart]);
    }
  };

  // Precio total
  const precioTotal = () => {
    return cart.reduce(
      (acumPrecio, prodObj) =>
        (acumPrecio = acumPrecio + prodObj.precio * prodObj.cantidad),
      0
    );
  };

  // Cantidad total
  const cantidadTotal = () => {
    return cart.reduce(
      (contador, produObject) => (contador += produObject.cantidad),
      0
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setCart(cart.filter((prod) => prod.id !== id));
  };

  // Vaciar carrito
  const emptyCart = () => {
    setCart([]);
  };

  // Generar orden
  const generateOrder = () => {
    const order = {};
    const dateNow = new Date();
    order.buyer = {
      nombre: user.name,
      email: user.email,
      telefono: user.phone,
    };
    order.date = dateNow;
    order.items = cart.map((prod) => {
      const id = prod.id;
      const name = prod.nombre;
      const quantity = prod.cantidad;
      return { id, name, quantity };
    });
    order.total = precioTotal();
    const db = getFirestore();
    const queryInsert = collection(db, "orders");
    addDoc(queryInsert, order)
      .then((resp) => {
        setOrder(resp.id);
      })
      .catch((err) => console.log(err))
      .finally(() => emptyCart());
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        eliminarProducto,
        emptyCart,
        cantidadTotal,
        precioTotal,
        generateOrder,
        user,
        setUser,
        order,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
