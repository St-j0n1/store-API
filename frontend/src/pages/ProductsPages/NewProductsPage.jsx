import ProductList from "../../components/Pagination";
import { useTranslation } from "react-i18next";
import { useProductsContext } from "../../contexts/ProductsContextProvider";

const NewProductsPage = () => {
  const { t } = useTranslation();
  const { clothes } = useProductsContext();
  const newClothes = clothes.filter((prod) => prod.result === "new product");
  const isTablet =  window.innerWidth >= 720 && window.innerWidth <= 1020 ;

  return (
    <div className="container refresh-page">
      <ProductList
        products={newClothes}
        productsPerPage={isTablet ? 21 : 20}
        category={t("New products")}
      />
    </div>
  );
};

export default NewProductsPage;
