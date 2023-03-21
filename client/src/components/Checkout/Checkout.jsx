import { useContext, useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";

function Checkout() {
  const { order } = useCartContext();
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return loading ? (
    <div className="text-center">
      <Spinner
        animation="border"
        role="status"
        variant="info"
        className=" mt-4"
      />
    </div>
  ) : (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center">
      <div>
        <h4 className="text-center mt-4">
          ¡Gracias por confiar en Las Flores Pastelería! Su compra fue realizada
          con éxito
        </h4>
        <h4 className="my-4">El id de su orden es: {order}</h4>
      </div>
      <Link
        to={"/"}
        className="text-center text-decoration-none css-button-sliding-to-left--sky mt-4"
      >
        {" "}
        <Button>Volver al inicio</Button>
      </Link>
    </Container>
  );
}

export default Checkout;
