import ProductList from "../../components/Pagination";
import { useTranslation } from "react-i18next";
import { useProductsContext } from "../../contexts/ProductsContextProvider";
import { useFilterContext } from "../../contexts/FilterContextProvider";
import { useLocation } from "react-router-dom";

const ProductsPage = () => {
  const { t } = useTranslation();
  const { clothes } = useProductsContext();
  const { filteredProducts } = useFilterContext();
  const location = useLocation();
  const isTablet =  window.innerWidth >= 720 && window.innerWidth <= 1020 ;

  const currentCategory = location.pathname.slice(1);
  const filteredClothes = filteredProducts
    ? filteredProducts.filter((prod) => prod.category === currentCategory || prod.subCategory === currentCategory)
    : clothes.filter((prod) => prod.category === currentCategory);
  
    
  return (
    <div className="container refresh-page">
      <ProductList
        products={filteredClothes}
        productsPerPage={isTablet ? 21 : 20}
        category={t(currentCategory)}
      />
    </div>
  );
};

export default ProductsPage;
