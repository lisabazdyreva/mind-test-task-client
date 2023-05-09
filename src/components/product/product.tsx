import { IProduct } from "../../types/product.ts";

interface IProductProps {
  product: IProduct;
  onCreateUserHandler: (id: number) => void;
  isAlreadyInCart: (id: number) => boolean;
}

const Product = ({
  product,
  onCreateUserHandler,
  isAlreadyInCart,
}: IProductProps) => {
  const { id, name, price } = product;
  const onClickAddToCartButtonHandler = () => {
    onCreateUserHandler(id);
  };

  const isInCart = isAlreadyInCart(product.id);

  return (
    <div>
      <h2>{name}</h2>
      <p>{price}</p>

      <button
        onClick={onClickAddToCartButtonHandler}
        type="button"
        disabled={isInCart}
      >
        {isInCart ? "Already in " : "Add to "}cart
      </button>
    </div>
  );
};

export default Product;
