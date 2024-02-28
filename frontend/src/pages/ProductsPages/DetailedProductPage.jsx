import Slider from "../../components/Slider";
import PhotoSwiper from "../../components/PhotoSwiper";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  faHeart,
  faChevronRight,
  faChevronLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProductsContext } from "../../contexts/ProductsContextProvider";
import { DetailedProducts, SimilarProductTitle } from "../AllPages";
import SliderForMobile from "../../components/SliderForMobile";
import { useState } from "react";
import CommentForm from "../../components/Requests/CommentForm";

const DetailedProductPage = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const {
    mainPhoto,
    addFav: addtoFav,
    clothes,
    favorites,
  } = useProductsContext();

  const [details, setDetails] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const currentUrl = location.pathname;
  const backPath = currentUrl.split("/")[1];

  const imagesForSlider = clothes.filter(
    (product) => product.category === backPath && product.id !== productId
  );

  const favoritesIds = favorites ? favorites.map((product) => product.id) : [];
  const isFavorited = favoritesIds.includes(productId);

  const isMobileView = window.innerWidth <= 1300;
  return (
    <div className="container refresh-page">
      {clothes?.map(
        (prod) =>
          prod.id === productId && (
            <DetailedProducts className="mobileSwiper" key={prod.id}>
              {isMobileView && (
                <FontAwesomeIcon
                  className="back-button"
                  onClick={() => navigate(`/${backPath}`)}
                  icon={faChevronLeft}
                  size="lg"
                />
              )}
              {isMobileView && (
                <SliderForMobile images={[prod.image, ...prod.moreImages]} />
              )}
              <div style={{position: 'relative'}}>
                {!isMobileView && (
                  <img
                    className="detailed-product-image"
                    src={mainPhoto || prod.image}
                    alt="img"
                  />
                )}
              <div className="detailed-slider">
                {!isMobileView && prod.moreImages.length > 0 && (
                  <PhotoSwiper
                    photos={[prod.image, ...prod.moreImages]}
                    id={prod.id}
                  />
                )}
              </div>

              </div>
              <div className="detailed-product-details">
                <div className="detailed-name-price">
                  <h1 className="detailed-product-name">{prod.name}</h1>
                  <h2 className="d-p-id">{prod.id.slice(-6)}</h2>
                  <h2 className="detailed-product-price">{prod.price}₾</h2>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: `${prod.color}` }}
                    className="color-icon"
                  />
                </div>
                <div onClick={() => addtoFav(prod)} className="d-p-favorite">
                  <h2 className="favorites-text">
                    {isFavorited
                      ? ` ${t("Added To Favorites")} `
                      : ` ${t("Add To Favorites")} `}
                  </h2>
                  <FontAwesomeIcon
                    className="heart-icon"
                    icon={ !isFavorited ? farHeart : faHeart}
                    style={{ color: isFavorited ? "#FF0000" : "black" }}
                  />
                </div>
                <h5 className="product-description">
                  {t("Description")}
                  {isMobileView && (
                    <FontAwesomeIcon
                      onClick={() => setDetails((prevState) => !prevState)}
                      icon={faChevronRight}
                    />
                  )}
                </h5>
                {(!isMobileView || details) && (
                  <h5 className="product-description-text">
                    {prod.description}
                  </h5>
                )}
              </div>
            </DetailedProducts>
          )
      )}
      <SimilarProductTitle>{t("Similar Products")}</SimilarProductTitle>
      <div style={{ marginBottom: "50px" }}>
        <Slider images={imagesForSlider} imagesPerView={4} />
      </div>
      <CommentForm />
    </div>
  );
};
export default DetailedProductPage;
