import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Products from "./pages/products";
import Product from "./pages/product";
import Dashboard from "./pages/dashboard";
import Cart from "./pages/cart";
import Content from "./components/admin/content";
import ContentControl from "./components/admin/contentControl";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
