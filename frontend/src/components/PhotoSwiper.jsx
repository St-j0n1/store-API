import { useProductsContext } from "../contexts/ProductsContextProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { PhotoSwiperContainer } from "../pages/AllPages";


const PhotoSwiper = ({ photos, id }) => {
  const { setMainPhoto } = useProductsContext();

  const handleClick = (photo) => {
    setMainPhoto(photo);
  };

  return (
    <PhotoSwiperContainer>
    <Swiper
    modules={[Navigation, Keyboard]}
    spaceBetween={19}
    slidesPerView={2}
    keyboard={true}
    loop={true}
    speed={700}
    effect="slide"
    easing="ease"
    scrollbar={{ draggable: true, hide: false }}
    style={{
    height: '400px'
    }}
    >
      
        {photos.map((photo, index) => (
          <SwiperSlide key={id + index} className="swiper-slider">
          <img
            onClick={() => handleClick(photo)}
            className="detailed-slider-images"
            src={photo}
            alt={`${index + 1}`}
          />
           </SwiperSlide>
        ))}
     
    </Swiper>
    </PhotoSwiperContainer>
  );
};

export default PhotoSwiper;
