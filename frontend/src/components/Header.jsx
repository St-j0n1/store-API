import Logo from "../assets/MA.png";
import MediaLogo from "../assets/Footerlogo.png";
import UserAuthorization from "./UserInformation/UserAuthorization";
import useScrollToTop from "../hooks/useScrollToTop";
import LanguageToggle from "./Buttons/LanguageToggle";
import ModalPopup from "./ModalPopup";
import FilterForm from "./Forms/FilterForm";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthorization } from "../contexts/AuthorizationContext";
import { useProductsContext } from "../contexts/ProductsContextProvider";
import { HeaderBg, HeaderContent, Navigation, Parameters } from "./components";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { useBurgerMenu } from "../contexts/BurgerMenuProvider";
import { useFilterContext } from "../contexts/FilterContextProvider";

const Header = () => {
  const { t } = useTranslation();
  const { openAuthorization, isOpen } = useAuthorization();
  const { setCurrentPage } = useProductsContext();
  const { isBurgerMenuOpen, openBurgerMenu } = useBurgerMenu();
  const { handleClick } = useScrollToTop("smooth");
  const [click, setClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const {
    setFilterByColor,
    setSortByPrice,
    setFilterBySale,
    setSortByNewestDate,
  } = useFilterContext();

  const isMobileView = window.innerWidth <= 768;
  const isMainPage = isMobileView ? location.pathname === "/" : false;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (click) {
      setCurrentPage(1);
      setFilterByColor("");
      setSortByPrice(null);
      setFilterBySale(false);
      setSortByNewestDate(false);
    }
    return () => {setClick(false)}
  }, [
    click,
    setCurrentPage,
    setFilterByColor,
    setSortByPrice,
    setFilterBySale,
    setSortByNewestDate,
  ]);

  return (
    <HeaderBg id="MainHeader" onClick={() => setClick(!click)}>
      {isOpen && <UserAuthorization />}
      {isBurgerMenuOpen && <BurgerMenu />}
      <HeaderContent className="container">
        <div>
          <Navigation className="BurgerMenu">
            <FontAwesomeIcon
              onClick={openBurgerMenu}
              icon={faBars}
              style={{ color: isMainPage ? "white" : "black" }}
            />
          </Navigation>
          <Navigation className="MainMenu">
            <li onClick={handleClick}>
              <Link to={"/woman"}>{t("Woman")}</Link>
            </li>
            <li onClick={handleClick}>
              <Link to={"/kids"}>{t("Kids")}</Link>
            </li>
          </Navigation>
        </div>
        <div className="logoDiv" onClick={handleClick}>
          <Link to="/">
            <img
              className="MediaLogo"
              src={isMainPage ? MediaLogo : Logo}
              alt="Logo"
            />
          </Link>
          <Link to="/">
            <img className="Logo" src={Logo} alt="Logo" />
          </Link>
        </div>
        <Parameters isMainPage={isMainPage}>
          <FilterForm nav={"/allProducts"} />
          <div>
            <div className="displayed">
              <LanguageToggle />
            </div>
            <div>
              <div onClick={openAuthorization}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="icons"
                  style={{
                    color: isMainPage
                      ? "white &:hover {#0000FF}"
                      : "black &:hover {#0000FF}",
                  }}
                />
              </div>
            </div>
            <div onClick={handleClick}>
              <Link to="/favorites">
                <FontAwesomeIcon
                  className="icons"
                  icon={faHeart}
                  style={{
                    color: isMainPage
                      ? "white &:hover {#0000FF}"
                      : "black &:hover {#0000FF}",
                  }}
                />
              </Link>
            </div>
          </div>
          {isMobileView ? null : showModal && <ModalPopup />}
        </Parameters>
      </HeaderContent>
    </HeaderBg>
  );
};
export default Header;
