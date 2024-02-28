import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/MA.png";
import { Authorization, UserContent } from "./UserInformation";
import UserButtonsMobile from "./UserButtonsMobile";
import { useAuthorization } from "../../contexts/AuthorizationContext";
import { useTranslation } from "react-i18next";
import {
  faCommentDots,
  faHeart,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SubmitButton } from "../components";
import { useState } from "react";
import UserInfo from "./UserInfo";

const UserLoggedIn = ({ users, onSuccess }) => {
  const { t } = useTranslation();
  const {
    closeAuthorization,
    closeRegistration,
    closeRessetPassword,
    closeUserInfo,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    setIsUserOpen,
    setUserLoggedIn,
  } = useAuthorization();
  const [userInfo, setUserInfo] = useState(false);

  const handleOverlayClick = () => {
    closeAuthorization();
    closeRegistration();
    closeRessetPassword();
    closeUserInfo();
  };

  const logout = () => {
    setIsUserOpen(false);
    setUserLoggedIn(false);
    setUserEmail("");
    setUserName("");
  };

  return (
    <div>
      <UserContent>
        <Authorization>
          {!userInfo && (
            <div>
              <div className="UserHeading">
                <div className="Heading">
                  <Link className="HeadingLogo" to={"/"}>
                    <img src={Logo} alt="Logo" />
                  </Link>
                  <div onClick={handleOverlayClick} className="closeBtn">
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
                <UserButtonsMobile />
              </div>
              <div className="userInfo">
                <h2>
                  {t("Hello")}: {userName}
                </h2>
                <h3>{userEmail}</h3>
                <Link onClick={handleOverlayClick} to={"/favorites"}>
                  <FontAwesomeIcon
                    style={{ color: "#FF0000" }}
                    icon={faHeart}
                  />
                  {t("liked Products")}
                </Link>
                <span onClick={() => setUserInfo(true)}>
                  <FontAwesomeIcon className="BurgerIcon" icon={faUserCircle} />
                  {t("My Information")}
                </span>
                <Link onClick={handleOverlayClick} to={"/contact"}>
                  <FontAwesomeIcon
                    className="BurgerIcon DD"
                    icon={faCommentDots}
                  />
                  {t("Contact Information")}
                </Link>
                <SubmitButton
                  style={{ marginTop: "40px" }}
                  onClick={() => logout()}
                >
                  {t("logout")}
                </SubmitButton>
              </div>
            </div>
          )}
          {userInfo && (
            <UserInfo
              onSuccess={onSuccess}
              users={users}
              setUserInfo={setUserInfo}
            />
          )}
        </Authorization>
        {/* <Overlay onClick={handleOverlayClick}></Overlay> */}
      </UserContent>
    </div>
  );
};

export default UserLoggedIn;
