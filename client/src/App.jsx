import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/container/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/container/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/container/Cart/Cart";
import CartProvider from "./context/CartContext";
import Checkout from "./components/Checkout/Checkout";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Container fluid="true">
          <NavBar />
          <Routes>
            <Route index path="/" element={<ItemListContainer />} />
            <Route index path="/tipo/:tipo" element={<ItemListContainer />} />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
