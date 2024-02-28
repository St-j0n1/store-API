import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ContactStyle } from "../AllPages";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "../../components/components";

const ContactUsPage = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .sendForm(
        "service_88hn9cw",
        "template_zvtywgo",
        form.current,
        "B-uGOjbU4o3JcFiPd"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          form.current.reset();
          setSuccess(true);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      });
  };

  return (
    <ContactStyle className="container refresh-page">
      <h1>{t("Contact Information")}</h1>
      <div className="about_info">
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="user_name">{t("name")}</label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            placeholder={t("name")}
          />
          <label htmlFor="user_lastName">{t("last name")}</label>
          <input
            id="user_lastName"
            type="text"
            name="user_lastName"
            placeholder={t("last name")}
          />
          <label htmlFor="user_email">{t("Email address")}</label>
          <input
            id="user_email"
            type="email"
            name="user_email"
            placeholder={t("Email address")}
          />
          <label htmlFor="user_phone">{t("phone number")}</label>
          <input
            id="user_phone"
            type="text"
            name="user_phone"
            placeholder={t("phone number")}
          />
          <label htmlFor="Message">{t("message")}</label>
          <textarea id="Message" name="message" placeholder={t("message")} />
          <div className="inputBtn">
            <input type="submit" value={t("Send")} />
            <div className="emailIcons">
              {loading && (
                <Loading>
                  <FontAwesomeIcon
                    style={{ color: "gray" }}
                    icon={faArrowsRotate}
                  />
                </Loading>
              )}
              {success && (
                <FontAwesomeIcon style={{ color: "green" }} icon={faCheck} />
              )}
            </div>
          </div>
        </form>
        <div className="contact_info">
          <div className="contact_about">
            <h2>{t("contact us")}:</h2>
            <h3>Mariamsatelier@gmail.com</h3>
            <h3>+995 599 999 999</h3>
            <h3> {t("tkibuli")} 23</h3>
          </div>
        </div>
      </div>
    </ContactStyle>
  );
};

export default ContactUsPage;
