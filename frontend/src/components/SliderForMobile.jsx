import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SliderForMobile = ({ images }) => {
  return (
    <Swiper
      className="slider-for-mobile"
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      speed={700}
      pagination={{
        clickable: true,
      }}
      effect="slide"
      easing="ease"
      scrollbar={{ draggable: true, hide: false }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            style={{ width: "100%", objectFit: "cover" }}
            src={image}
            alt="swiperimage"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderForMobile;
