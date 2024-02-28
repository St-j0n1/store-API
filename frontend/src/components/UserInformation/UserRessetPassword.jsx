import React, { useState } from "react";
import { Authorization, UserForm } from "./UserInformation";
import Logo from "../../assets/MA.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowsRotate,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../hooks/useToggle";
import { useAuthorization } from "../../contexts/AuthorizationContext";
import { useTranslation } from "react-i18next";
import UserButtonsMobile from "./UserButtonsMobile";
import useRegistration from "../../hooks/useRegistration";
import useRequest from "../../hooks/useRequest";
import { Loading } from "../components";

const UserRessetPassword = ({ onSuccess, users }) => {
  const { t } = useTranslation();
  const { showPassword: showPassword1, togglePassword: toggle1 } =
    useToggle(false);
  const { showPassword: showPassword2, togglePassword: toggle2 } =
    useToggle(false);
  const { closeRessetPassword } = useAuthorization();
  const [emailExists, setEmailExists] = useState(true);

  const { loading, sentRequest, sendRequest } = useRequest({
    method: "PUT",
    envVariable: "REACT_APP_USERS",
  });

  const { EmailRef, PasswordRef, CPasswordRef, validateInputs, handleInput } =
    useRegistration();

  const onFormSubmit = (e) => {
    e.preventDefault();
    const userRegister = {
      Email: EmailRef.current.value,
      Password: PasswordRef.current.value,
      CPassword: CPasswordRef.current.value,
    };

    const isValid = validateInputs(userRegister);
    const user = users.filter((user) => user.Email === userRegister.Email);

    const isMailExists = users?.find(
      (user) => user.Email === userRegister.Email
    );

    if (isValid) {
      if (isMailExists) {
        sendRequest(
          { Password: userRegister.Password },
          `https://crudapi.co.uk/api/v1/users/${user[0].id}`
        )
          .then(() => {
            onSuccess(userRegister.Email, userRegister.Password);
          })
          .catch((err) => console.log(err));
      } else {
        return setEmailExists(false);
      }
    } 
  };

  return (
    <Authorization>
      <div className="UserHeading">
        <div className="Heading">
          <Link className="HeadingLogo" to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="closeBtn">
            <FontAwesomeIcon onClick={closeRessetPassword} icon={faArrowLeft} />
          </div>
        </div>
        <UserButtonsMobile goBack={closeRessetPassword} />
      </div>
      <div className="title title2">
        <h2>{t("Resset Password")}</h2>
      </div>
      <UserForm onSubmit={onFormSubmit}>
        <div className="input">
          <label htmlFor="Email2">{t("Email address")}</label>
          <input
            style={{
              border: emailExists ? "1px solid black" : "1px solid #D80000",
            }}
            name="Email"
            id="Email2"
            type="text"
            placeholder={t("Email address")}
            ref={EmailRef}
            onChange={handleInput}
            autoComplete="email"
          />
        </div>
        <div className="input PasInput marginDel">
          <label htmlFor="Password2">{t("Password")}</label>
          <input
            name="Password"
            id="Password2"
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
          <label htmlFor="CPassword2">{t("Confirm Password")}</label>
          <input
            name="CPassword"
            id="CPassword2"
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
        <div className="formLoadings formLoadings2">
          {loading && (
            <Loading>
              <FontAwesomeIcon icon={faArrowsRotate} />
            </Loading>
          )}
          {sentRequest && (
            <FontAwesomeIcon style={{ color: "green" }} icon={faCheck} />
          )}
        </div>
        <div className="formButtons">
          <button id="Register2">{t("Resset Password")}</button>
        </div>
      </UserForm>
    </Authorization>
  );
};

export default UserRessetPassword;
