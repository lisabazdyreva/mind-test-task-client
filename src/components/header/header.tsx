import { Link } from "react-router-dom";

import "./header.css";
import { Route } from "../../utils/const.ts";

const Header = () => {
  return (
    <header className="header">
      <Link className="link" to={Route.Products}>
        Products
      </Link>
      <Link className="link" to={Route.Cart}>
        Cart
      </Link>
      <Link className="link" to={Route.ProductsCreate}>
        Create new product
      </Link>
    </header>
  );
};

export default Header;
