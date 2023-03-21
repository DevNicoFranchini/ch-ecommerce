import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import ItemDetail from "../../Item/ItemDetail";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const queryProduct = doc(db, "products", id);
    getDoc(queryProduct)
      .then((resp) => setProduct({ id: resp.id, ...resp.data() }))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return loading ? (
    <div className="text-center my-4">
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Cargando...
      </Button>
    </div>
  ) : (
    <ItemDetail product={product}/>
  );
};

export default ItemDetailContainer;
