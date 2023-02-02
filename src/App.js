import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Content from "./components/Admin/Content";
import ContentControl from "./components/Admin/ContentControl";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />

          <Route path="products" element={<Outlet />}>
            <Route index element={<Products />} />
            <Route path=":id" element={<Product />} />
          </Route>

          <Route path="cart" element={<Cart />} />

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Content />} />
            <Route
              path="control"
              element={<ContentControl editable={false} />}
            />
            <Route
              path="control/:id"
              element={<ContentControl editable={true} />}
            />
          </Route>

          <Route
            path="*"
            element={<h2 className="text-center mt-4">page not found</h2>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
