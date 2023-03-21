import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import ItemsList from "../../ItemsList/ItemsList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tipo } = useParams();

  useEffect(() => {
    const db = getFirestore();
    if (tipo) {
      const queryCollection = collection(db, "products");
      const queryCollectionFilter = query(
        queryCollection,
        where("tipo", "==", tipo)
      );
      getDocs(queryCollectionFilter)
        .then((resp) =>
          setProducts(
            resp.docs.map((prod) => ({ id: prod.id, ...prod.data() }))
          )
        )
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      const queryCollection = collection(db, "products");
      getDocs(queryCollection)
        .then((resp) =>
          setProducts(
            resp.docs.map((prod) => ({ id: prod.id, ...prod.data() }))
          )
        )
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [tipo]);

  return loading ? (
    <div className="text-center my-4">
      <Spinner animation="border" role="status" variant="dark" />
    </div>
  ) : (
    <ItemsList producto={products} />
  );
};

export default ItemListContainer;
