import React, { createContext, useContext, useEffect, useState } from "react";
import { useProductsContext } from "./ProductsContextProvider";
import { useLocation } from "react-router-dom";
import productColors from "../data/ProductColors";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const { clothes } = useProductsContext();
  const [filteredData, setFilteredData] = useState(clothes);
  const location = useLocation();

  const currentCategory = location.pathname.slice(1);

  const handleFilter = () => {
    if (search === "") {
      setFilteredData(clothes);
    } else {
      const filteredResult = clothes.filter((item) => {
        const nameMatch = item.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const categoryMatch = item.category
          .toLowerCase()
          .includes(search.toLowerCase());
        const pickedColor = productColors.find(
          (el) => el.english === search || el.georgian === search
        ) || { english: null };
        const colorMatch = pickedColor.english
          ? item.color.toLowerCase().includes(pickedColor.english.toLowerCase())
          : false;
        const newMatch = item?.result
          ?.toLowerCase()
          .includes(search.toLowerCase());
        const descMatch = item?.description
          ?.toLowerCase()
          .includes(search.toLowerCase());
        return (
          nameMatch || categoryMatch || colorMatch || newMatch || descMatch
        );
      });

      setFilteredData(filteredResult);
    }
  };

  useEffect(() => {
    if (currentCategory !== "allProducts") {
      setFilteredData(clothes);
    }
  }, [currentCategory, clothes]);

  return (
    <SearchContext.Provider
      value={{ search, setSearch, setFilteredData, filteredData, handleFilter }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
