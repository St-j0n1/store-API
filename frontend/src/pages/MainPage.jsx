import Slider from "../components/Slider";
import promoPhoto from "../assets/promo-photo.png";
import Subscription from "../components/Subscription";
import SwiperSlider from "../components/Swiper/SwiperSlider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProductsContext } from "../contexts/ProductsContextProvider";
import { MainContainer, PopularCollections } from "./AllPages";
import SubmitBtn from "../components/Buttons/SubmitBtn";

const MainPage = () => {
  const { t } = useTranslation();
  const { clothes } = useProductsContext();
  const [promoPhotoLoaded, setPromoPhotoLoaded] = useState(false);

  const handlePromoPhotoLoad = () => {
    setPromoPhotoLoaded(true);
  };
  const popularImages = clothes.filter(prod => prod.isOnSale)

  return (
    <MainContainer
      className={`main-page refresh-page ${promoPhotoLoaded ? "loaded" : ""}`}
    >
      <div
        className={`main-photo-container ${promoPhotoLoaded ? "loaded" : ""}`}
      >
        <div className="main-content">
          <img
            className="main-page-photo"
            src={promoPhoto}
            alt="mainPhoto"
            onLoad={handlePromoPhotoLoad}
          />
          <div className="mainBtn">
            <SubmitBtn name={t("new")} nav={"newProducts"} />
          </div>
        </div>
        {promoPhotoLoaded && (
          <div>
            <PopularCollections>
              <h3 className="popular-collection-title">{t("Popular")}</h3>
              <div className="popular-collection-gallary container">
                <div className="mainBtn">
                  <SubmitBtn name={t("View All")} nav={"popular"} />
                </div>
                <Slider images={popularImages} imagesPerView={4} />
              </div>
            </PopularCollections>
            <SwiperSlider />
            <Subscription />
          </div>
        )}
      </div>
    </MainContainer>
  );
};

export default MainPage;
