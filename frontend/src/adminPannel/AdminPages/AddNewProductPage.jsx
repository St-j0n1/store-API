import ProductForm from "../AdminComponents/ProductForm";
import useProductRequest from "../AdminHooks/useProductRequest";
import { LoadingDiv } from "../../components/components.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const AddNewProduct = () => {
  const { loading, sendRequest } = useProductRequest({
    url: "https://crudapi.co.uk/api/v1/products",
    method: "POST",
  });

  const onSubmit = (
    name,
    price,
    description,
    color,
    category,
    subCategory,
    url,
    sliderImages,
    result
  ) => {
    sendRequest([
      {
        name,
        price,
        description,
        color,
        category,
        subCategory,
        url,
        sliderImages,
        result
      },
    ]);
  };

  if (loading)
    return (
      <LoadingDiv style={{ left: "50%" }}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </LoadingDiv>
    );

  return (
    <div className="container">
      <ProductForm onFormSubmit={onSubmit} />
    </div>
  );
};

export default AddNewProduct;
