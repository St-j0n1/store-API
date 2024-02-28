import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../components";

const SubmitBtn = ({ name, nav }) => {
  const navigate = useNavigate();
  const { handleClick } = useScrollToTop("smooth");

  const handleButtonClick = () => {
    handleClick();
    navigate(`/${nav}`);
  };

  return <SubmitButton onClick={handleButtonClick}>{name}</SubmitButton>;
};

export default SubmitBtn;
