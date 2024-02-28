import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BurgerStyle } from "./BurgerMenuStyle";
import {
  faHeart,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useBurgerMenu } from "../../contexts/BurgerMenuProvider";
import { Navigation, Parameters } from "../components";
import FilterForm from "../Forms/FilterForm";
import LanguageToggle from "../Buttons/LanguageToggle";
import { Link, useLocation } from "react-router-dom";
import { useAuthorization } from "../../contexts/AuthorizationContext";
import UserAuthorization from "../UserInformation/UserAuthorization";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useTranslation } from "react-i18next";

const BurgerMenu = () => {
  const { t } = useTranslation();
  const { closeBurgerMenu } = useBurgerMenu();
  const { openAuthorization, isOpen } = useAuthorization();
  const { handleClick } = useScrollToTop("smooth");
  const location = useLocation();

  const isMainPage = location.pathname === "/";

  return (
    <BurgerStyle>
      {isOpen && <UserAuthorization style={{ color: "black" }} />}
      <div className="BurgerHeader">
        <div className="closeBtn" onClick={closeBurgerMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <Parameters isMainPage={!isMainPage || isMainPage}>
          <FilterForm nav={"/allProducts"} />
          <div>
            <div className="displayed">
              <LanguageToggle />
            </div>
            <div onClick={closeBurgerMenu}>
              <div className="BurgerIcon" onClick={openAuthorization}>
                <FontAwesomeIcon icon={faUserCircle} />
              </div>
            </div>
            <div className="BurgerIcon" onClick={handleClick}>
              <Link onClick={closeBurgerMenu} to="/favorites">
                <FontAwesomeIcon icon={faHeart} />
              </Link>
            </div>
          </div>
        </Parameters>
      </div>
      <Navigation className="MainMenu">
        <li onClick={handleClick}>
          <Link onClick={closeBurgerMenu} to={"/woman"}>
            {t("Woman")}
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link onClick={closeBurgerMenu} to={"/kids"}>
            {t("Kids")}
          </Link>
        </li>
      </Navigation>
      <div className="otherNav">
        <Link onClick={closeBurgerMenu} to={"/newProducts"}>
          {t("New Collection")}
        </Link>
        <Link onClick={closeBurgerMenu} to={"allProducts"}>
          {t("allProducts")}
        </Link>
        <Link onClick={closeBurgerMenu} to={"wedding"}>
          {t("Wedding")}
        </Link>
        <Link onClick={closeBurgerMenu} to={"banquet"}>
          {t("Banquet")}
        </Link>
      </div>
    </BurgerStyle>
  );
};

export default BurgerMenu;
