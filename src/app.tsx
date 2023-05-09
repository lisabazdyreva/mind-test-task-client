import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Route as RouteURL } from "./utils/const.ts";

import "./app.css";

import ProductCreatePage from "./pages/product-create/product-create-page.tsx";
import ProductsPage from "./pages/products/products-page.tsx";
import CartPage from "./pages/cart/cart-page.tsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={RouteURL.Products} />} />
          <Route
            path={RouteURL.ProductsCreate}
            element={<ProductCreatePage />}
          />
          <Route path={RouteURL.Products} element={<ProductsPage />} />
          <Route path={RouteURL.Cart} element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
