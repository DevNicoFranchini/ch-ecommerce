import { Container } from "react-bootstrap";
import Item from "../Item/Item";

function ItemsList({ producto }) {
  return (
    <Container className="d-flex justify-content-evenly px-5 my-3 flex-wrap w-100">
      {producto.map((element) => (
        <Item products={element} key={element.id} />
      ))}
    </Container>
  );
}

export default ItemsList;
