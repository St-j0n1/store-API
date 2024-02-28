import useEmailForm from "../../hooks/useEmailForm";
import modalPhoto from "../../assets/popupimage.png";
import { Overlay } from "../UserInformation/UserInformation";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ErrorMessage, ModalPopupStyle } from "../components";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function ModalForm({ onFormSubmit, loading, sentEmail }) {
  const { emailRef, isInputEmpty, isValidEmail, handleInputChange, onSubmit } =
    useEmailForm(onFormSubmit);
  const { t } = useTranslation();
  const [isModalClosed, setIsModalClosed] = useLocalStorage(
    "isModalClosed",
    false
  );

  const inputStyle = {
    border:
      isInputEmpty && !sentEmail
        ? "1px solid black"
        : isValidEmail && !sentEmail
        ? "1px solid black"
        : isValidEmail && sentEmail
        ? "1px solid green"
        : "1px solid #D80000",

    color: isValidEmail ? "black" : "#D80000",
  };

  const emailSubForm = sentEmail ? "emailSubSuccess" : "";

  useEffect(() => {}, [isModalClosed]);
  const closeModal = () => {
    setIsModalClosed(true);
  };

  return (
    <div>
      {!isModalClosed && (
        <div>
          <ModalPopupStyle>
            <img className="image" src={modalPhoto} alt="something" />
            <div className="modal">
              <span className="popup_btn" onClick={closeModal}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <h1 className="percent">15%</h1>
              <p className="text">{t("Sign up")}</p>
              <form className="TabletMode" onSubmit={onSubmit}>
                <div className="loading">{loading}</div>
                <input
                  style={inputStyle}
                  name="subscription"
                  className={`email ${emailSubForm}`}
                  id="subscription1"
                  type="text"
                  placeholder={t("Email address")}
                  ref={emailRef}
                  onChange={handleInputChange}
                />
                <div className="loading checked">{sentEmail}</div>
                {!isValidEmail && (
                  <ErrorMessage className="error-message">
                    <FontAwesomeIcon icon={faXmark} />
                  </ErrorMessage>
                )}
                <button className="submitBtn" type="submit">
                  {t("Submit")}
                </button>
              </form>
              <p className="off">OFF</p>
            </div>
          </ModalPopupStyle>
          <Overlay onClick={closeModal} />
        </div>
      )}
    </div>
  );
}
export default ModalForm;
