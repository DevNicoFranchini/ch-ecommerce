import { useCartContext } from "../../context/CartContext";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FormOrder = () => {
  const { user, setUser, precioTotal, emptyCart, generateOrder } =
    useCartContext();

  const validUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validData = (e) => {
    setUser({ ...user, checked: e.target.checked });
  };

  return (
    <Container className="d-flex flex-column justify-content-center my-4">
      <div className="container p-4 border">
        <h3 className="text-center mb-3">Datos personales</h3>
        <Form>
          <Row>
            <Col>
              <Form.Control
                placeholder="Nombre"
                name="name"
                onChange={(e) => {
                  validUser(e);
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Telefono"
                name="phone"
                onChange={(e) => {
                  validUser(e);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                className="mt-2"
                placeholder="Email"
                name="email"
                onBlur={(e) => {
                  validUser(e);
                }}
              />
            </Col>
          </Row>
        </Form>
      </div>
      <div className="d-flex flex-column gap-2 col-2 w-100">
        <div className="w-100">
          {precioTotal() !== 0 && `Precio final: $${precioTotal()}`}
        </div>
        <div className="w-100">
          <Link to="/checkout">
            <Button
              variant="primary"
              size="sm"
              onClick={generateOrder}
              className="w-100"
            >
              Generar Orden
            </Button>
          </Link>
        </div>
        <Button variant="danger" size="sm" onClick={emptyCart}>
          Vaciar Carrito
        </Button>
      </div>
    </Container>
  );
};

export default FormOrder;
