import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import "./product-list.css";

import Product from "../product/product.tsx";
import Modal from "../modals/modal.tsx";

import { useAddToCartMutation, useGetCartQuery } from "../../services/cart.ts";
import { useCreateUserMutation } from "../../services/user.ts";

import { IProduct } from "../../types/product.ts";

import useModal from "../../hooks/useModal.ts";
import { InfoStatusMessage } from "../../utils/const.ts";
import { getErrorMessage } from "../../utils/utils.ts";

interface IProductsListProps {
  products: IProduct[];
}

const ProductList = ({ products }: IProductsListProps) => {
  const { isModalOpen, openModal } = useModal();
  const userCartId = localStorage.getItem("userId");

  const [userId, setCartId] = useState(userCartId);

  const { data: cartItems } = useGetCartQuery(userId ?? skipToken);
  const [addToCart, { isLoading: isAddCartLoading, error, isSuccess }] =
    useAddToCartMutation();
  const [createUser] = useCreateUserMutation();

  const onCreateUserHandler = async (productId: number) => {
    if (!localStorage.getItem("userId")) {
      const generatedId = uuidv4();
      await createUser({ userId: generatedId });

      localStorage.setItem("userId", generatedId);
      setCartId(generatedId);
    }

    await addToCart({
      productId,
      quantity: 1,
      userId: localStorage.getItem("userId"),
    })
      .unwrap()
      .then(() => {
        openModal();
      })
      .catch(() => {
        openModal();
      });
  };

  const isAlreadyInCart = (productId: number) =>
    !!cartItems &&
    !!cartItems.filter((cartItem) => cartItem.product.id === productId).length;

  return (
    <div className="product-list">
      {isAddCartLoading && InfoStatusMessage.Loading}
      {isSuccess && isModalOpen && <Modal text="Product was added to cart" />}
      {error && isModalOpen && <Modal text={getErrorMessage(error)} />}
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          onCreateUserHandler={onCreateUserHandler}
          isAlreadyInCart={isAlreadyInCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
