import ProductList from "../../components/Pagination";
import { Link } from "react-router-dom";
import { useProductsContext } from "../../contexts/ProductsContextProvider";
import { FavoritePage } from "../AllPages";
import { useTranslation } from "react-i18next";

const FavoritesPage = () => {
  const { t } = useTranslation();
  const { favorites } = useProductsContext();
  const isTablet =  window.innerWidth >= 720 && window.innerWidth <= 1020 ;

  return (
    <FavoritePage className="container refresh-page">
      {favorites && favorites.length > 0 ? (
        <ProductList products={favorites} productsPerPage={isTablet ? 9 : 8} category="favorites" />
      ) : (
        <div className="favorites-no-products">
          <h2 className="favorites-text">{t("not added")}</h2>
          <Link className="favorites-back-button" to="/">
            {t("Back to Products")}
          </Link>
        </div>
      )}
    </FavoritePage>
  );
};

export default FavoritesPage;
