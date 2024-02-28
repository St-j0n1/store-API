import { useState } from "react";

const useToggle = (id) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return { id, showPassword, togglePassword };
};

export default useToggle;
