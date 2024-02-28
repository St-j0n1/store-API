import React, { useState } from "react";
import {
  Authorization,
  Overlay,
  UserContent,
  UserForm,
} from "./UserInformation";
import Logo from "../../assets/MA.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faEye,
  faEyeSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../hooks/useToggle";
import { useAuthorization } from "../../contexts/AuthorizationContext";
import UserRegister from "./UserRegister";
import { useTranslation } from "react-i18next";
import UserButtonsMobile from "./UserButtonsMobile";
import UserRessetPassword from "./UserRessetPassword";
import UserLoggedIn from "./UserLoggedIn";
import useFetch from "../../hooks/useFetch";

const UserAuthorization = () => {
  const { t } = useTranslation();
  const { showPassword, togglePassword } = useToggle(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordExists, setPasswordExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    closeRegistration,
    closeAuthorization,
    isRegOpen,
    openRegister,
    isRessOpen,
    openRessetPassword,
    closeRessetPassword,
    isUserOpen,
    openUserInfo,
    closeUserInfo,
    setUserName,
    setUserEmail,
    userLoggedIn,
    setUserLoggedIn,
  } = useAuthorization(false);

  const { fetchRequest, resendRequest } = useFetch({
    url: "https://crudapi.co.uk/api/v1/users",
    method: "GET",
    envVariable: "REACT_APP_USERS",
  });

  const users = fetchRequest?.items.map((user) => ({
    Email: user.Email,
    Password: user.Password,
    UName: user.UName,
    FName: user.FName,
    id: user._uuid,
  }));

  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const RegisterOnSuccess = (email, password) => {
    setAuthEmail(email);
    setAuthPassword(password);
    resendRequest();
  };

  const handleOverlayClick = () => {
    closeAuthorization();
    closeRegistration();
    closeRessetPassword();
    closeUserInfo();
  };

  const onClick = (e) => {
    e.preventDefault();
    if (users && users.length > 0) {
      const loggedInUser = users.find((user) => {
        return (
          user.Email === authEmail &&
          user.Password === authPassword &&
          user.UName &&
          user.id
        );
      });

      if (loggedInUser) {
        setLoading(true);
        setTimeout(() => {
          console.log("You are logged in");
          setUserLoggedIn(true);
          setUserName(loggedInUser.UName);
          setUserEmail(loggedInUser.Email);
          openUserInfo(loggedInUser.UName, loggedInUser.Email);
          setLoading(false);
        }, 2000);
      } else {
        setEmailExists(true);
        setPasswordExists(true);
      }
    }
  };

  return (
    <UserContent>
      <Authorization>
        {isRegOpen && <UserRegister onSuccess={RegisterOnSuccess} />}
        {isRessOpen && (
          <UserRessetPassword users={users} onSuccess={RegisterOnSuccess} />
        )}
        {userLoggedIn && (
          <UserLoggedIn onSuccess={RegisterOnSuccess} users={users} />
        )}
        {!isUserOpen && !userLoggedIn && (
          <div>
            <div className="UserHeading">
              <div className="Heading">
                <Link className="HeadingLogo" to={"/"}>
                  <img src={Logo} alt="Logo" />
                </Link>
                <div onClick={closeAuthorization} className="closeBtn">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
              <UserButtonsMobile />
            </div>
            <div>
              <h2 className="AuthoText">{t("Authorization")}</h2>
            </div>
            <UserForm>
              <div className="input">
                <label htmlFor="Email1">{t("Email address")}</label>
                <input
                  style={{
                    border: emailExists
                      ? "1px solid #D80000"
                      : "1px solid black",
                  }}
                  name="Email1"
                  id="Email1"
                  type="text"
                  placeholder={t("Email address")}
                  value={authEmail}
                  onChange={(e) => {
                    setAuthEmail(e.target.value);
                    setEmailExists(false);
                  }}
                  autoComplete="email"
                />
              </div>
              <div className="input PasInput">
                <label htmlFor="Password1">{t("Password")}</label>
                <input
                  style={{
                    border: passwordExists
                      ? "1px solid #D80000"
                      : "1px solid black",
                  }}
                  name="password1"
                  id="Password1"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("Password")}
                  value={authPassword}
                  onChange={(e) => {
                    setAuthPassword(e.target.value);
                    setPasswordExists(false);
                  }}
                  autoComplete="current-password"
                />
                <FontAwesomeIcon
                  id="PasEye"
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={togglePassword}
                />
                <div onClick={openRessetPassword} className="ResPass">
                  <span>{t("Recover Password")}</span>
                </div>
              </div>
              <div className="formButtons">
                {loading && (
                  <FontAwesomeIcon className="icon" icon={faArrowsRotate} />
                )}
                <button id="LogIn" onClick={onClick}>
                  {t("Log in")}
                </button>
                <button id="Register" onClick={openRegister}>
                  {t("Register")}
                </button>
              </div>
            </UserForm>
          </div>
        )}
      </Authorization>
      <Overlay onClick={handleOverlayClick}></Overlay>
    </UserContent>
  );
};

export default UserAuthorization;
