import { FormEvent, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

import Cart from "../../components/cart/cart.tsx";
import Header from "../../components/header/header.tsx";
import CartForm from "../../components/cart-form/cart-form.tsx";
import Modal from "../../components/modals/modal.tsx";

import { useGetCartQuery, useRemoveCartMutation } from "../../services/cart.ts";
import { usePostOrderMutation } from "../../services/order.ts";
import { useRemoveUserMutation } from "../../services/user.ts";

import useModal from "../../hooks/useModal.ts";

import { getErrorMessage } from "../../utils/utils.ts";
import { InfoContentMessage, InfoStatusMessage } from "../../utils/const.ts";

const CartPage = () => {
  const id = localStorage.getItem("userId");
  const [userId, setUserId] = useState(id);

  const { isModalOpen, openModal } = useModal();

  const {
    data: cartItems,
    isLoading: isCartItemsLoading,
    error: cartItemsError,
  } = useGetCartQuery(userId ?? skipToken);

  const [
    postOrder,
    {
      isLoading: isOrderPostLoading,
      isSuccess: isOrderPostSuccess,
      error: orderError,
    },
  ] = usePostOrderMutation();

  const [
    removeCart,
    { isLoading: isCartRemoving, isError: isCartRemoveError },
  ] = useRemoveCartMutation();

  const [removeUser] = useRemoveUserMutation();

  if (isCartRemoveError) {
    return <div>{InfoStatusMessage.Error}</div>;
  }

  const submitForm = async (
    evt: FormEvent,
    phoneNumber: string,
    clearInput: () => void
  ) => {
    evt.preventDefault();

    const totalPrice =
      cartItems?.reduce((accum, current) => {
        accum += current.product.price * current.quantity;
        return accum;
      }, 0) || 0;

    await postOrder({
      userId: localStorage.getItem("userId"),
      customer_phone: phoneNumber,
      sum: totalPrice,
    })
      .unwrap()
      .then(async () => {
        openModal();
        clearInput();
        return await removeUser({ userId: localStorage.getItem("userId") });
      })
      .then(async () => {
        resetUserId();
        localStorage.clear();
      })
      .catch(() => {
        openModal();
      });
  };

  const resetForm = async (clearInput: () => void) => {
    await removeCart({ userId: id })
      .unwrap()
      .then(async () => {
        clearInput();
        return await removeUser({ userId: id });
      })
      .then(() => {
        resetUserId();
        localStorage.clear();
      });
  };

  const resetUserId = () => {
    setUserId(null);
  };

  return (
    <div>
      <Header />
      <h1 className="main-header">Cart</h1>
      {isCartItemsLoading && InfoStatusMessage.Loading}
      {cartItemsError && <p>{getErrorMessage(cartItemsError)}</p>}
      {(!cartItems || !cartItems.length) && (
        <>
          <br />
          {InfoContentMessage.EmptyProducts}
        </>
      )}
      {!!cartItems?.length && !isOrderPostSuccess && (
        <Cart cartItems={cartItems} />
      )}
      {orderError && isModalOpen && (
        <Modal text={getErrorMessage(orderError)} />
      )}
      {isOrderPostSuccess && isModalOpen && (
        <Modal text={InfoContentMessage.PostedOrder} />
      )}
      <CartForm
        submitForm={submitForm}
        resetForm={resetForm}
        isCartFull={Boolean(cartItems?.length) || false}
        isSending={isOrderPostLoading}
        isRemoving={isCartRemoving}
      />
    </div>
  );
};

export default CartPage;
