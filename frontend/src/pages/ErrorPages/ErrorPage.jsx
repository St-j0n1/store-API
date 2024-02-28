import { useTranslation } from "react-i18next";
import { ErrorElement } from "../AllPages";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorElement className="container refresh-page">
      <h1>404!</h1>
      <h2>{t("Page is unavailable")}...</h2>
      <h3>{t("Our phone number")} : +995 557 999 999</h3>
    </ErrorElement>
  );
};

export default ErrorPage;
