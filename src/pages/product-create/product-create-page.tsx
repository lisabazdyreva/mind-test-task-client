import AddProductForm from "../../components/add-product-form/add-product-form.tsx";
import Header from "../../components/header/header.tsx";
import Modal from "../../components/modals/modal.tsx";
import { useCreateProductMutation } from "../../services/products.ts";

import useModal from "../../hooks/useModal.ts";
import { InfoContentMessage } from "../../utils/const.ts";
import { getErrorMessage } from "../../utils/utils.ts";

const ProductCreatePage = () => {
  const { isModalOpen, openModal } = useModal();
  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  const onSubmitAddProductFormHandler = async (data: FormData) => {
    await createProduct(data)
      .unwrap()
      .then(() => {
        openModal();
      })
      .catch((e) => {
        openModal();
      });
  };

  return (
    <div>
      <Header />
      <h1 className="main-header">Create new product</h1>
      {error && isModalOpen && <Modal text={getErrorMessage(error)} />}
      {isSuccess && isModalOpen && (
        <Modal text={InfoContentMessage.CreatedProduct} />
      )}
      <AddProductForm
        onSubmitAddProductFormHandler={onSubmitAddProductFormHandler}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductCreatePage;
