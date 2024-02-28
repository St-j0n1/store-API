import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthorizationContext = createContext(null);

export const AuthorizationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegOpen, setRegisterVisible] = useState(false);
  const [isRessOpen, setIsRessOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useLocalStorage("isUserOpen", false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [userEmail, setUserEmail] = useLocalStorage("userEmail", "");
  const [userLoggedIn, setUserLoggedIn] = useLocalStorage(
    "userLoggedIn",
    false
  );

  const openRegister = (e) => {
    e.preventDefault();
    setRegisterVisible(true);
  };

  const closeRegistration = () => {
    setRegisterVisible(false);
  };

  const openAuthorization = () => {
    setIsOpen(true);
  };

  const closeAuthorization = () => {
    setIsOpen(false);
  };

  const openRessetPassword = () => {
    setIsRessOpen(true);
  };

  const closeRessetPassword = () => {
    setIsRessOpen(false);
  };

  const openUserInfo = (name, email) => {
    setIsUserOpen(true);
    setUserDetails({ name, email });
  };

  const closeUserInfo = () => {
    setIsUserOpen(false);
  };

  return (
    <AuthorizationContext.Provider
      value={{
        isOpen,
        openAuthorization,
        closeAuthorization,
        isRegOpen,
        openRegister,
        closeRegistration,
        isRessOpen,
        openRessetPassword,
        closeRessetPassword,
        isUserOpen,
        setIsUserOpen,
        openUserInfo,
        closeUserInfo,
        userDetails,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userLoggedIn,
        setUserLoggedIn,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = () => {
  return useContext(AuthorizationContext);
};
