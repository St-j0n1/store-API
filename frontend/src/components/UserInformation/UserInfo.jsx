import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowsRotate,
  faCheck,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/MA.png";
import useRequest from "../../hooks/useRequest";
import { useAuthorization } from "../../contexts/AuthorizationContext";
import { useTranslation } from "react-i18next";
import useToggle from "../../hooks/useToggle";
import useRegistration from "../../hooks/useRegistration";
import { Loading } from "../components";
import { Authorization, UserContent, UserForm } from "./UserInformation";
import { Link } from "react-router-dom";
import UserButtonsMobile from "./UserButtonsMobile";

function UserInfo({ users, setUserInfo, onSuccess }) {
  const {
    userName,
    setUserLoggedIn,
    setIsUserOpen,
    setUserEmail,
    setUserName,
  } = useAuthorization();
  const loggedInUser = users.find((user) => user.UName === userName);
  const { showPassword: showPassword1, togglePassword: toggle1 } =
    useToggle(false);
  const { showPassword: showPassword2, togglePassword: toggle2 } =
    useToggle(false);

  const { t } = useTranslation();
  const { loading, sentRequest, sendRequest } = useRequest({
    url: `https://crudapi.co.uk/api/v1/users/${loggedInUser.id}`,
    method: "PUT",
    envVariable: "REACT_APP_USERS",
  });

  const { PasswordRef, CPasswordRef, validateInputs, handleInput } =
    useRegistration();

  const onFormSubmit = (e) => {
    e.preventDefault();
    const userRegister = {
      Email: loggedInUser.Email,
      Password: PasswordRef.current.value,
      CPassword: CPasswordRef.current.value,
    };

    const isValid = validateInputs(userRegister);
    const user = users.filter((user) => user.Email === userRegister.Email);

    if (isValid) {
      sendRequest(
        { Password: userRegister.Password, CPassword: userRegister.CPassword },
        `https://crudapi.co.uk/api/v1/users/${user[0].id}`
      )
        .then(() => {
          onSuccess(userRegister.Email, userRegister.Password);
          setIsUserOpen(false);
          setUserLoggedIn(false);
          setUserEmail("");
          setUserName("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <UserContent>
      <Authorization>
        <div className="UserHeading">
          <div className="Heading Heading2">
            <Link className="HeadingLogo" to={"/"}>
              <img src={Logo} alt="Logo" />
            </Link>
            <FontAwesomeIcon
              onClick={() => setUserInfo(false)}
              icon={faArrowLeft}
              className="goBackBtn"
            />
          </div>
          <div onClick={() => setUserInfo(false)}>
            <UserButtonsMobile />
          </div>
        </div>
        <div className="userInformation">
          <h2>{t("Email address")}</h2>
          <h3>{loggedInUser.Email}</h3>
          <h2>{t("Full name")}</h2>
          <h3>{loggedInUser.FName}</h3>
          <h2>{t("User name")}</h2>
          <h3>{loggedInUser.UName}</h3>
        </div>
        <h1 className="RecPass">{t("Recover Password")}</h1>
        <UserForm onSubmit={onFormSubmit}>
          <div className="input PasInput marginDel">
            <label htmlFor="Password3">{t("Password")}</label>
            <input
              name="Password"
              id="Password3"
              type={showPassword1 ? "text" : "password"}
              placeholder={t("New Password")}
              ref={PasswordRef}
              onChange={handleInput}
              autoComplete="new-password"
            />
            <FontAwesomeIcon
              id="PasEye1"
              icon={showPassword1 ? faEye : faEyeSlash}
              onClick={toggle1}
            />
          </div>
          <div className="input PasInput">
            <label htmlFor="CPassword3">{t("Confirm Password")}</label>
            <input
              name="CPassword"
              id="CPassword3"
              type={showPassword2 ? "text" : "password"}
              placeholder={t("Confirm Password")}
              ref={CPasswordRef}
              onChange={handleInput}
              autoComplete="new-password"
            />
            <FontAwesomeIcon
              id="PasEye2"
              icon={showPassword2 ? faEye : faEyeSlash}
              onClick={toggle2}
            />
          </div>
          <button className="ressButton" type="submit">
            {t("Resset Password")}
          </button>
        </UserForm>
        <div className="formLoadings3">
          <div className="formLoad">
            {loading && (
              <Loading>
                <FontAwesomeIcon icon={faArrowsRotate} />
              </Loading>
            )}
            {sentRequest && (
              <FontAwesomeIcon style={{ color: "green" }} icon={faCheck} />
            )}
          </div>
        </div>
      </Authorization>
    </UserContent>
  );
}

export default UserInfo;
