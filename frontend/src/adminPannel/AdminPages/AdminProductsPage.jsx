import ProductList from "../AdminComponents/AdminPagination";
import { useTranslation } from "react-i18next";
import { useFilterContext } from "../../contexts/FilterContextProvider";
import { useNavigate } from "react-router-dom";
import useProductFetch from "../AdminHooks/useProductFetch";
import { LoadingDiv, SubmitButton } from "../../components/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useAdminAuth } from "../AdminContexts/AdminAuthContext";
import { AdminHeader } from "../../pages/AllPages";

const AdminProducts = () => {
  const { t } = useTranslation();
  const { filteredProducts } = useFilterContext();
  const { logout } = useAdminAuth();
  const isTablet =  window.innerWidth >= 720 && window.innerWidth <= 1020 ;

  const AdminProducts = filteredProducts.map((prod) => prod);
  const navigate = useNavigate();

  const { error, loading, resendRequest } = useProductFetch({
    url: "https://crudapi.co.uk/api/v1/products",
    method: "GET",
  });

  const onClick = () => {
    navigate("/admin/add");
  };

  const handleLogout = () => {
    logout();
  };

  if (loading)
    return (
      <LoadingDiv style={{ left: "50%" }}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </LoadingDiv>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <AdminHeader>
        <SubmitButton onClick={handleLogout}>
          {t('logout')}
        </SubmitButton>
        <SubmitButton onClick={onClick}>
          {t("add product")}
        </SubmitButton>
        <SubmitButton onClick={() => navigate("/admin/users")}>
          {t('user data')}
        </SubmitButton>
      </AdminHeader>
      <ProductList
        products={AdminProducts}
        resendRequest={resendRequest}
        productsPerPage={isTablet ? 21 : 20}
        category={t("allProducts")}
      />
    </div>
  );
};

export default AdminProducts;
