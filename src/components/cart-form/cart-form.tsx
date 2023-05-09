import { ChangeEvent, FormEvent, useState } from "react";

import "./cart-form.css";

import { InfoContentMessage, InfoStatusMessage } from "../../utils/const.ts";

interface ICartFormProps {
  submitForm: (
    evt: FormEvent,
    phoneNumber: string,
    clearInput: () => void
  ) => void;
  resetForm: (clearInput: () => void) => void;
  isCartFull: boolean;
  isSending: boolean;
  isRemoving: boolean;
}

const CartForm = ({
  submitForm,
  resetForm,
  isCartFull,
  isSending,
  isRemoving,
}: ICartFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const clearInput = () => {
    setPhoneNumber("");
    setIsPhoneNumberValid(false);
  };

  const onSubmitCartFormHandlerH = async (evt: FormEvent) => {
    if (isPhoneNumberValid) {
      await submitForm(evt, phoneNumber, clearInput);
    }
  };

  const onResetCartFormHandlerH = async () => {
    await resetForm(clearInput);
  };

  const onChangePhoneNumberInputHandler = (evt: ChangeEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    if (value === "" || value === "+" || Number(value)) {
      setPhoneNumber(value);
    }
  };

  const onInputPhoneNumberInputHandler = (evt: FormEvent<HTMLInputElement>) => {
    const cleanedNumber = (evt.target as HTMLInputElement).value.replace(
      /\D/g,
      ""
    );
    setIsPhoneNumberValid(/^(\+?7|8)9\d{9}$/.test(cleanedNumber));
  };

  const isPostOrderDisabled = !isCartFull || !phoneNumber.length;
  const isButtonSubmitDisabled =
    !isCartFull || isSending || isRemoving || !isPhoneNumberValid;
  const isButtonResetDisabled = !isCartFull || isSending || isRemoving;

  const disableWarningElement = (
    <p className="cart-form__validity-message cart-form__validity-message--success">
      {InfoContentMessage.EmptyCart}
    </p>
  );

  return (
    <form
      className="cart-form"
      onSubmit={onSubmitCartFormHandlerH}
      onReset={onResetCartFormHandlerH}
    >
      <label className="cart-form__label" htmlFor="user_phone_number">
        Your phone number
      </label>
      <input
        className="cart-form__input"
        id="user_phone_number"
        type="tel"
        placeholder="Enter your phone number, please"
        value={phoneNumber}
        onChange={onChangePhoneNumberInputHandler}
        onInput={onInputPhoneNumberInputHandler}
      />

      {isPhoneNumberValid ? (
        <p className="cart-form__validity-message cart-form__validity-message--success">
          Correct
        </p>
      ) : (
        <p className="cart-form__validity-message cart-form__validity-message--error">
          Format: +79.... or 89...
        </p>
      )}

      <div className="cart-form__button-wrapper">
        <button
          className="button"
          type="reset"
          disabled={isButtonResetDisabled}
        >
          {isRemoving ? InfoStatusMessage.Removing : "Remove cart"}
        </button>
        <button
          className="button"
          type="submit"
          disabled={isButtonSubmitDisabled}
        >
          {isSending ? InfoStatusMessage.Sending : "Send cart"}
        </button>
      </div>
      {isPostOrderDisabled && disableWarningElement}
    </form>
  );
};

export default CartForm;
