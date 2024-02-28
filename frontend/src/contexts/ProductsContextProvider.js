import { useParams } from "react-router-dom";
import useProductFetch from "../adminPannel/AdminHooks/useProductFetch";
import products from "../data/products";
import useLocalStorage from "../hooks/useLocalStorage";
import { createContext, useContext, useState, useEffect } from "react";
import productColors from "../data/ProductColors";

const ProductsContext = createContext(null);

const ProductsContextProvider = ({ children }) => {
  const [mainPhoto, setMainPhoto] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [oldProducts, setClothes] = useState(products);
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", 1);
  const [loading, setLoading] = useState(true);
  const productId = useParams();

  useEffect(() => {
    setMainPhoto(null);
  }, [productId]);

  const addFav = (product) => {
    setFavorites((prevState) => {
      if (!prevState) {
        return [product];
      }
      const index = prevState.findIndex((prod) => prod.id === product.id);

      if (index !== -1) {
        const updatedState = [...prevState];
        updatedState.splice(index, 1);
        return updatedState;
      } else {
        return [product, ...prevState];
      }
    });
  };

  const { products: adminProducts } = useProductFetch({
    url: "https://crudapi.co.uk/api/v1/products",
    method: "GET",
  });

  const productsList =
    adminProducts?.items.map((product) => {
      const colorObject = productColors.find(
        (color) => color.georgian === product.color
      );

      const color = colorObject ? colorObject.english : product.color;

      return {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        subCategory: product.subCategory,
        color: color,
        id: product._uuid,
        image: product.url,
        moreImages: product.sliderImages,
        result: product.result,
      };
    }) || [];

  const clothes = [...productsList, ...oldProducts];

  const ids = clothes.map((prod) => prod.id);
  const checkFavorites = favorites ? favorites.filter((fav) => ids.includes(fav.id)): null;

  useEffect(() => {
    if (!arraysEqual(favorites, checkFavorites)) {
      setFavorites(checkFavorites);
    }
  }, [checkFavorites, setFavorites, favorites]);

  function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const contextValue = {
    mainPhoto,
    setMainPhoto,
    addFav,
    favorites,
    clothes,
    setClothes,
    currentPage,
    setCurrentPage,
    loading,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => {
  const contextValue = useContext(ProductsContext);
  return contextValue;
};

export default ProductsContextProvider;
