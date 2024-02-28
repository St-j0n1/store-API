import { useRef } from "react";

const useRegistration = () => {
  const EmailRef = useRef();
  const FNameRef = useRef();
  const UNameRef = useRef();
  const PasswordRef = useRef();
  const CPasswordRef = useRef();

  const validateInputs = (userRegister) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const styledBorder = "1px solid red";
    const areInputsEmpty = Object.values(userRegister).some(
      (val) => val === ""
    );

    if (areInputsEmpty) {
      const inputFields = document.querySelectorAll("input");
      inputFields.forEach((input) => {
        if (userRegister[input.name] === "") {
          input.style.border = styledBorder;
        } else {
          input.style.border = "";
        }
      });
      return false;
    } else if (userRegister.Password !== userRegister.CPassword) {
      PasswordRef.current.style.border = styledBorder;
      CPasswordRef.current.style.border = styledBorder;
      return false;
    } else if (!userRegister.Email || !emailRegex.test(userRegister.Email)) {
      EmailRef.current.style.border = styledBorder;
      return false;
    }

    return true;
  };

  const handleInput = (e) => {
    e.target.style.border = "";
  };

  return {
    EmailRef,
    FNameRef,
    UNameRef,
    PasswordRef,
    CPasswordRef,
    validateInputs,
    handleInput,
  };
};

export default useRegistration;
