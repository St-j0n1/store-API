import MainPage from "../pages/MainPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorPage from "../pages/ErrorPages/ErrorPage";
import FavoritesPage from "../pages/ProductsPages/FavoritesPage";
import AboutUsPage from "../pages/FooterLinkPages/AboutUsPage";
import ContactUsPage from "../pages/FooterLinkPages/ContactUsPage";
import NewProductsPage from "../pages/ProductsPages/NewProductsPage";
import AllProducts from "../pages/ProductsPages/AllProducts";
import DetailedProductPage from "../pages/ProductsPages/DetailedProductPage";
import ProductsContextProvider from "../contexts/ProductsContextProvider";
import FilterContextProvider from "../contexts/FilterContextProvider";
import ProductsPage from "../pages/ProductsPages/ProductsPage";
import { Outlet } from "react-router-dom";
import { AuthorizationProvider } from "../contexts/AuthorizationContext";
import { SearchProvider } from "../contexts/SearchFilterContext";
import { BurgerMenuProvider } from "../contexts/BurgerMenuProvider";
import LocationPage from "../pages/FooterLinkPages/LocationPage";
import PopularCollection from "../pages/ProductsPages/PopularCollection";

const userRoutes = [
  {
    element: (
      <div>
        <AuthorizationProvider>
          <ProductsContextProvider>
            <SearchProvider>
              <FilterContextProvider>
                <BurgerMenuProvider>
                  <Header />
                  <Outlet />
                  <Footer />
                </BurgerMenuProvider>
              </FilterContextProvider>
            </SearchProvider>
          </ProductsContextProvider>
        </AuthorizationProvider>
      </div>
    ),
    path: "/",
    children: [
      {
        element: <MainPage />,
        index: true,
      },
      {
        element: <AllProducts />,
        path: "allProducts",
      },
      {
        element: <NewProductsPage />,
        path: "newProducts",
      },
      {
        element: <PopularCollection />,
        path: "popular",
      },
      {
        element: <ProductsPage />,
        path: "woman",
      },
      {
        element: <ProductsPage />,
        path: "kids",
      },
      {
        element: <ProductsPage />,
        path: "banquet",
      },
      {
        element: <ProductsPage />,
        path: "wedding",
      },
      {
        element: <DetailedProductPage />,
        path: "woman/products/:productId",
      },
      {
        element: <DetailedProductPage />,
        path: "kids/products/:productId",
      },
      {
        element: <DetailedProductPage />,
        path: "banquet/products/:productId",
      },
      {
        element: <DetailedProductPage />,
        path: "wedding/products/:productId",
      },
      {
        element: <FavoritesPage />,
        path: "favorites",
      },
      {
        element: <AboutUsPage />,
        path: "aboutUs",
      },
      {
        element: <ContactUsPage />,
        path: "contact",
      },
      {
        element: <LocationPage />,
        path: "location",
      },
      {
        element: <ErrorPage />,
        path: "*",
      },
    ],
  },
];

export default userRoutes;
