import ProductList from "../../components/Pagination";
import { useTranslation } from "react-i18next";
import { useProductsContext } from "../../contexts/ProductsContextProvider";

const PopularCollection = () => {
  const { t } = useTranslation();
  const { clothes } = useProductsContext();
  const popularImages = clothes.filter((prod) => prod.isOnSale);
  const isTablet =  window.innerWidth >= 720 && window.innerWidth <= 1020 ;

  return (
    <div className="container refresh-page">
      <ProductList
        products={popularImages}
        productsPerPage={isTablet ? 21 : 20}
        category={t("Popular")}
      />
    </div>
  );
};

export default PopularCollection;
