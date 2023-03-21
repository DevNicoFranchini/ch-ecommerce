import { useCartContext } from "../../../context/CartContext";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import FormOrder from "./../../Checkout/Form";
import ItemCart from "../../Item/ItemCart";

import "./Cart.css";

const Cart = () => {
  const { cart } = useCartContext();

  return (
    <Container className="container-cart d-flex justify-content-center">
      {cart.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center my-2 gap-5">
          <h3>Tu carrito de compras se encuentra vacío</h3>

          <Link to="/">
            <Button size="lg">
              {cart.length == 0 && `Volver al inicio y empezar a comprar`}
            </Button>
          </Link>
        </div>
      ) : (
        <Container className="d-flex justify-content-evenly flex-wrap">
          <div className="d-flex flex-wrap justify-content-center align-items-center col-12 col-md-8">
            {cart.map((product) => (
              <ItemCart key={product.id} product={product} />
            ))}
          </div>
          <div className="d-flex justify-content-center align-items-start col-12 col-md-4">
            <FormOrder />
          </div>
        </Container>
      )}
    </Container>
  );
};

export default Cart;
