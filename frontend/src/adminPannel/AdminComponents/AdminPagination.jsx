import "../../index.css";
import Filter from "../../components/Filter/Filter";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import useScrollToTop from "../../hooks/useScrollToTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { ProductGrid, ProductsListTop } from "../../pages/AllPages";
import { useProductsContext } from "../../contexts/ProductsContextProvider";
import { useEffect, useState } from "react";
import useProductRequest from "../AdminHooks/useProductRequest";

const ProductList = ({
  products,
  resendRequest,
  productsPerPage,
  category,
}) => {
  const { setMainPhoto, currentPage, setCurrentPage } = useProductsContext();
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const { handleClick } = useScrollToTop();
  const { productId } = useParams();
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const { sendRequest } = useProductRequest({
    method: "DELETE",
  });

  useEffect(() => {
    setMainPhoto(null);
  }, [productId, setMainPhoto]);

  const handlePageChange = (event, value) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(value);
  };

  const handleDelete = (id) => {
    sendRequest(null, `https://crudapi.co.uk/api/v1/products/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      <ProductsListTop>
        <h2 className="new-collection-title">{category}</h2>
        <Filter />
      </ProductsListTop>
      <ProductGrid>
        {currentProducts.map((product) => (
          <div
            className="product-container product-container-admin"
            key={product.id}
            onClick={handleClick}
          >
            <div style={{ color: "black" }}>
              <div className="product-img-and-icon">
                <img
                  className="product-image product-image-admin"
                  src={product.image}
                  alt="img"
                  onLoad={() => setPhotoLoaded(true)}
                />
                <div className="product-admin-icons">
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="product-edit-icon"
                  >
                    <FontAwesomeIcon size="lg" icon={faPen} />
                  </Link>
                  <div
                    className="product-delete-icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FontAwesomeIcon size="lg" icon={faTrash} />
                  </div>
                </div>
              </div>
              {photoLoaded && <h2 className="product-name">{product.name}</h2>}
              {photoLoaded && (
                <div className="price-and-color">
                  <h3 className="product-price">{`${product.price}$`}</h3>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: `${product.color}` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </ProductGrid>
      {photoLoaded && (
        <Stack spacing={2}>
          <Pagination
            className="pagination"
            count={Math.ceil(products.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </div>
  );
};

export default ProductList;
