import { ChangeEvent, FormEvent, useRef, useState } from "react";

import "./add-product-form.css";
import { InfoStatusMessage } from "../../utils/const.ts";

interface IAddProductFormProps {
  onSubmitAddProductFormHandler: (evt: FormData) => void;
  isLoading: boolean;
}

const AddProductForm = ({
  onSubmitAddProductFormHandler,
  isLoading,
}: IAddProductFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState<string | Blob>("");
  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const onChangeNameInputHandler = (evt: ChangeEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    setName(value);
  };

  const onChangePriceInputHandler = (evt: ChangeEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    if (Number(value)) {
      setPrice(value);
    }
  };

  const onChangeImageInputHandler = (evt: ChangeEvent) => {
    const files = (evt.target as HTMLInputElement).files;

    if (files?.length) {
      setImage(files[0]);
    }
  };

  const onSubmitAddProductFormHandlerH = async (evt: FormEvent) => {
    evt.preventDefault();

    if (name.length && price && image) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);

      await onSubmitAddProductFormHandler(formData);

      setName("");
      setPrice("");
      (fileInputRef.current as HTMLInputElement).value = "";
      setImage("");
    }
  };

  const isButtonSubmitDisabled =
    !price.length || !name.length || !image || isLoading;

  return (
    <div className="add-product-form__wrapper">
      <form
        className="add-product-form"
        onSubmit={onSubmitAddProductFormHandlerH}
      >
        <label className="add-product-form__label" htmlFor="product_name">
          Name *
        </label>
        <input
          className="add-product-form__input"
          id="product_name"
          type="text"
          placeholder="Name of product"
          value={name}
          autoComplete="off"
          minLength={2}
          maxLength={100}
          onChange={onChangeNameInputHandler}
          required
        />

        <label htmlFor="product_price">Price *</label>
        <input
          className="add-product-form__input"
          id="product_price"
          type="text"
          placeholder="Price"
          value={price}
          onChange={onChangePriceInputHandler}
          maxLength={30}
          required
        />

        <label htmlFor="product_image">Choose image *</label>
        {image && <p>image added</p>}
        <input
          ref={fileInputRef}
          id="product_image"
          type="file"
          accept="image/png, image/jpeg"
          onChange={onChangeImageInputHandler}
          required
        />

        <button
          className="button add-product-form__button"
          disabled={isButtonSubmitDisabled}
          type="submit"
        >
          {isLoading ? InfoStatusMessage.Loading : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
