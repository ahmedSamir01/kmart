import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Errors from "./pages/errors";
import Nav from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />

          <Route path="products" element={<Outlet />}>
            <Route index element={<Products />} />
          </Route>

          <Route path="cart" element={<Cart />} />

          <Route path="*" element={<Errors />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
