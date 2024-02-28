import React from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "./SwiperStyle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import SubmitBtn from "../Buttons/SubmitBtn";
import { useTranslation } from "react-i18next";
import weddingCategory from "../../assets/weddingCategory.jpg"
import banquetPhoto from "../../assets/banquetPhoto.png"
import kidsPhoto from "../../assets/kidPhoto.jpg"

const SwiperSlider = () => {
  const { t } = useTranslation();
  const weddingSlider = [weddingCategory, weddingCategory, weddingCategory, weddingCategory]
  const banquetSlider = [banquetPhoto, banquetPhoto, banquetPhoto, banquetPhoto]
  const kidsSlider = [kidsPhoto, kidsPhoto, kidsPhoto, kidsPhoto]
  
  return (
    <div className="swiper-slide swiper_container">
      <div className="swiper_content">
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative]}
          className="mySwiper"
        >
          {banquetSlider.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={img} alt="nature" />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <SubmitBtn name={t("Banquet")} nav={"banquet"} category={"Banquet"} />
      </div>
      <div className="swiper_content">
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative]}
          className="mySwiper"
        >
          {weddingSlider.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={img} alt="nature" />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <SubmitBtn name={t("Wedding")} nav={"wedding"} category={"Wedding"} />
      </div>
      <div className="swiper_content">
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative]}
          className="mySwiper"
        >
          {kidsSlider
            // .filter((img, index) => {
            //   return img ? index > 9 && index < 14 : null;
            // })
            .map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={img} alt="nature" />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <SubmitBtn name={t("Childish")} nav={"kids"} />
      </div>
    </div>
  );
};

export default SwiperSlider;
