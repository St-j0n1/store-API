import { Outlet } from "react-router-dom";
import FilterContextProvider from "../contexts/FilterContextProvider";
import ProductsContextProvider from "../contexts/ProductsContextProvider";
import { SearchProvider } from "../contexts/SearchFilterContext";
import AdminLogin from "../adminPannel/AdminPages/AdminLoginPage";
import AdminProducts from "../adminPannel/AdminPages/AdminProductsPage";
import { AdminAuthProvider } from "../adminPannel/AdminContexts/AdminAuthContext";
import { ProtectedRoute } from "../adminPannel/AdminComponents/ProtectedRoute";
import AddNewProduct from "../adminPannel/AdminPages/AddNewProductPage";
import EditProductPage from "../adminPannel/AdminPages/EditProductPage";
import UserData from "../adminPannel/AdminPages/UserData";

const adminRoutes = [
  {
    element: (
      <ProductsContextProvider>
        <SearchProvider>
          <FilterContextProvider>
            <AdminAuthProvider>
              <Outlet />
            </AdminAuthProvider>
          </FilterContextProvider>
        </SearchProvider>
      </ProductsContextProvider>
    ),
    path: "/admin",
    children: [
      {
        element: <AdminLogin />,
        index: true,
      },
      {
        element: <ProtectedRoute element={<AdminProducts />} />,
        path: "products",
      },
      {
        element: <ProtectedRoute element={<UserData />} />,
        path: "users",
      },
      {
        element: <ProtectedRoute element={<EditProductPage />} />,
        path: "products/:productId",
      },
      {
        element: <ProtectedRoute element={<AddNewProduct />} />,
        path: "add",
      },
    ],
  },
];

export default adminRoutes;
