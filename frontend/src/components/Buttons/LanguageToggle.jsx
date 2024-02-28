import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useLocalStorage(
    "currentLanguage",
    "ge"
  );

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "ge" ? "en" : "ge";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  return (
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        width: "26px",
      }}
      onClick={toggleLanguage}
    >
      {i18n.language === "ge" ? "EN" : "GE"}
    </button>
  );
};

export default LanguageToggle;
