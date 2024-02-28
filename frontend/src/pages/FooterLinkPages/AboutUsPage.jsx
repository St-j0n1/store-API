import AboutUs from "../../assets/fabrics.jpg";
import AboutUs2 from "../../assets/mariamsAtelier.mp4";
import AboutUs3 from "../../assets/aboutUs3.jpeg";
import { useTranslation } from "react-i18next";
import { AboutStyle } from "../AllPages";
import { useState } from "react";

const AboutUsPage = () => {
  const { t } = useTranslation();
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <AboutStyle className="container refresh-page">
      <h2>{t("About Us")}</h2>
      <div className="aboutContent">
        <h1>mariam’s atelier</h1>
        <img src={AboutUs3} alt="Logo" />
      </div>
      <div className="aboutContentInfo">
        <div className="first_paragraph">
          <p>
            {t("about us 1")}
            {t("about us 2")}
          </p>
          <video autoPlay muted={muted} onClick={toggleMute}>
            <source src={AboutUs2} type="video/mp4" />
          </video>
        </div>
        <div className="second_paragraph"></div>
        <div className="third_paragraph">
          <img src={AboutUs} alt="aboutUs" />
          <p>
            {t("about us 3")}
            {t("about us 4")}
          </p>
        </div>
      </div>
    </AboutStyle>
  );
};

export default AboutUsPage;
