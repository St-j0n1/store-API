import { LocationStyle } from "../AllPages";
import LocationImg from "../../assets/location.png";
import AtelieLogo from "../../assets/New.png";
import { useTranslation } from "react-i18next";

const LocationPage = () => {
  const { t } = useTranslation();

  return (
    <LocationStyle className="refresh-page">
      <div className="location_desc">
        <div className="location_display">
          <img className="AtelieLogo" src={AtelieLogo} alt="Logo" />
          <div>
            <h2 className="title">{t("mariam’s atelier")}</h2>
            <h3 className="email">Mariamsatelier@gmail.com</h3>
            <h3 className="number">+995 599 999 999</h3>
            <h3 className="location">
              {t("tkibuli")} 23 <img src={LocationImg} alt="location" />
            </h3>
          </div>
        </div>
        <h2 className="Working_days">{t("Working Days")}</h2>
        <p>{t("Monday-Friday")}: 11:00 - 18:00</p>
      </div>
      <div className="location_map">
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.6407797615984!2d42.99468737634768!3d42.350181471193736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c9b6789b358b9%3A0x42808f9ace1c1c53!2zMjMg4YOS4YOQ4YOb4YOh4YOQ4YOu4YOj4YOg4YOT4YOY4YOQ4YOhIOGDpeGDo-GDqeGDkCwgVGtpYnVsaQ!5e0!3m2!1sen!2sge!4v1704161624117!5m2!1sen!2sge"
          width="100%"
          height="100%"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </LocationStyle>
  );
};

export default LocationPage;
