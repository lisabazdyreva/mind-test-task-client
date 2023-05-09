import { Link } from "react-router-dom";

import ProductList from "../../components/product-list/product-list.tsx";
import Header from "../../components/header/header.tsx";

import { useGetProductsQuery } from "../../services/products.ts";
import {
  InfoContentMessage,
  InfoStatusMessage,
  Route,
} from "../../utils/const.ts";
import { getErrorMessage } from "../../utils/utils.ts";

const ProductsPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const linkCreateProduct = (
    <Link className="link" to={`${Route.ProductsCreate}`}>
      Create your first product
    </Link>
  );

  const noProductsElement = (
    <div>
      {InfoContentMessage.EmptyProducts}
      <br />
      {linkCreateProduct}
    </div>
  );

  return (
    <div>
      <Header />
      <h2>List of all products in system</h2>
      {isLoading && <p>{InfoStatusMessage.Loading}</p>}
      {error && getErrorMessage(error)}
      {(!products || !products.length) &&
        !isLoading &&
        !error &&
        noProductsElement}
      {products && <ProductList products={products} />}
    </div>
  );
};

export default ProductsPage;
