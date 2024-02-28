import {
  ErrorMessage,
  LoadingDiv,
  SubmitButton,
  SubscriptionStyle,
} from "../components";
import { useTranslation } from "react-i18next";
import useEmailForm from "../../hooks/useEmailForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EmailForm = ({ onFormSubmit, loading, sentEmail, isFormSubmitted }) => {
  const { emailRef, isInputEmpty, isValidEmail, handleInputChange, onSubmit } =
    useEmailForm(onFormSubmit);
  const { t } = useTranslation();

  const inputStyle = {
    border:
      isInputEmpty && !isFormSubmitted
        ? "1px solid black"
        : isValidEmail && !isFormSubmitted
        ? "1px solid black"
        : isValidEmail && isFormSubmitted
        ? "1px solid green"
        : "1px solid #D80000",

    color: isValidEmail ? "black" : "#D80000",
  };

  const emailSubForm = isFormSubmitted ? "emailSubSuccess" : "";

  return (
    <SubscriptionStyle>
      <h1>{t("Subscribe to our newsletter")}</h1>
      <form className="EmailForms" onSubmit={onSubmit}>
        <label htmlFor="subscription">
          {t("subscribe to receive our latest news")}
        </label>
        <LoadingDiv>{loading}</LoadingDiv>
        <input
          style={inputStyle}
          name="subscription"
          id="subscription"
          type="text"
          placeholder={t("enter E-mail")}
          ref={emailRef}
          className={emailSubForm}
          onChange={handleInputChange}
        />
        <ErrorMessage style={{ color: "#14AE5C" }}>{sentEmail}</ErrorMessage>
        {!isValidEmail && (
          <ErrorMessage className="error-message">
            <FontAwesomeIcon style={{ color: "#d80000" }} icon={faXmark} />
          </ErrorMessage>
        )}
        <SubmitButton>{t("Submit")}</SubmitButton>
      </form>
    </SubscriptionStyle>
  );
};

export default EmailForm;
