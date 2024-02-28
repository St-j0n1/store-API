import React, { createContext, useContext, useState } from "react";

const BurgerMenuContext = createContext();

export const useBurgerMenu = () => {
  const context = useContext(BurgerMenuContext);
  if (!context) {
    throw new Error("useBurgerMenu must be used within a BurgerMenuProvider");
  }
  return context;
};

export const BurgerMenuProvider = ({ children }) => {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const openBurgerMenu = () => {
    setBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setBurgerMenuOpen(false);
  };

  return (
    <BurgerMenuContext.Provider
      value={{
        isBurgerMenuOpen,
        openBurgerMenu,
        closeBurgerMenu,
        setBurgerMenuOpen,
      }}
    >
      {children}
    </BurgerMenuContext.Provider>
  );
};
