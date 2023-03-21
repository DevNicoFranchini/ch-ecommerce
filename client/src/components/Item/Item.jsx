import { Card, Button } from "react-bootstrap";
import { memo } from "react";
import { Link } from "react-router-dom";

import "./Item.css";

const Item = memo(({ products }) => {
  return (
    <Link
      to={`/detail/${products.id}`}
      className="d-flex justify-content-evenly item"
    >
      <Card className="text-center m-2 w-100 shadow">
        <Card.Header as="h5">{products.nombre}</Card.Header>
        <Card.Img variant="top" src={products.img} className="p-2" />
        <Card.Body className="py-0">
          <Card.Text>{products.descripcion}</Card.Text>
          <Card.Text>${products.precio}</Card.Text>
          <Button className="mb-4" variant="outline-secondary">
            Ver más
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
});

export default Item;
