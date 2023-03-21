import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import { useCartContext } from "./../../context/CartContext";

import ItemCount from "./../ItemCount/ItemCount";

import "./Item.css";

const ItemDetail = memo(({ product }) => {
  const { addProduct } = useCartContext();
  const [cantidad, setCantidad] = useState();

  const onAdd = (count) => {
    setCantidad(count);
    addProduct({ cantidad: count, ...product });
  };

  return (
    <Container className="d-flex w-100 justify-content-center">
      <Card className="text-center my-3 mx-1 shadow item">
        <Card.Header as="h5">{product.nombre}</Card.Header>
        <Card.Img variant="top" src={product.img} className="p-2" />
        <Card.Body className="py-0">
          <Card.Text className="my-1">{product.descripcion}</Card.Text>
          <Card.Text className="my-1">${product.precio}</Card.Text>
          {cantidad ? (
            <>
              <ItemCount stock={product.stock} initial={1} onAdd={onAdd} />
              <Link to="/cart">
                <Button className="m-2" variant="outline-info">
                  Ver carrito
                </Button>
              </Link>
              <Link to="/">
                <Button className="m-2" variant="outline-success">
                  Seguir comprando
                </Button>
              </Link>
            </>
          ) : (
            <>
              <ItemCount stock={product.stock} initial={1} onAdd={onAdd} />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
});

export default ItemDetail;
