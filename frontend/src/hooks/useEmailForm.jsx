import { useRef, useState } from "react";

const useEmailForm = (onFormSubmit) => {
  const emailRef = useRef();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && emailRegex.test(email)) {
      onFormSubmit(email);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleInputChange = () => {
    const email = emailRef.current.value;
    setIsInputEmpty(email.trim() === "");

    if (!isInputEmpty) {
      setIsValidEmail(true);
    }
  };

  return {
    emailRef,
    isValidEmail,
    onSubmit,
    isInputEmpty,
    handleInputChange,
  };
};

export default useEmailForm;
