import { Card, Button } from "react-bootstrap";
import { memo } from "react";
import { useCartContext } from "../../context/CartContext";

import "./Item.css";

const ItemCart = memo(({ product }) => {
  const { eliminarProducto } = useCartContext();

  return (
    <Card className="text-center mt-4 mx-1 shadow item-cart">
      <Card.Header as="h5">{product.nombre}</Card.Header>
      <Card.Img variant="top" src={product.img} className="p-2" />
      <Card.Body className="item-cart--body">
        <Card.Text>Cantidad agregada: {product.cantidad}</Card.Text>
        <Button variant="danger" onClick={() => eliminarProducto(product.id)}>
          Eliminar del carrito
        </Button>
      </Card.Body>
    </Card>
  );
});

export default ItemCart;
