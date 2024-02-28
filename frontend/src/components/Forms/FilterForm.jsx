import useScrollToTop from "../../hooks/useScrollToTop";
import { useEffect, useState } from "react";
import { useSearch } from "../../contexts/SearchFilterContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useBurgerMenu } from "../../contexts/BurgerMenuProvider";

const FilterForm = ({ nav }) => {
  const { handleFilter, setSearch, search } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const { handleClick } = useScrollToTop("smooth");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setBurgerMenuOpen } = useBurgerMenu();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter();
    handleClick();
    navigate(nav);
    setInputValue("");
    setBurgerMenuOpen(false);
    setSearch("")
  };

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="SearchBar"
        id="SearchBar"
        onChange={(e) => setSearch(e.target.value)}
        value={inputValue}
        type="text"
        placeholder={t("Search")}
      />
      <button className="formBtn" type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default FilterForm;
