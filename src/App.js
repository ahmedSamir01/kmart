import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Errors from "./pages/Errors";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
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
