import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts.jsx/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/Products/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts.jsx/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import AddProduct from "../pages/Dashboard/User/AddProduct";
import MyProducts from "../pages/Dashboard/User/MyProducts";
import ProductReviewQueue from "../pages/Dashboard/Moderator/ProductReviewQueue";
import ReportedContents from "../pages/Dashboard/Moderator/ReportedContents";
import Statistics from "../pages/Dashboard/Admin/Statistics";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "product-review-queue",
        element: <ProductReviewQueue />,
      },
      {
        path: "reported-contents",
        element: <ReportedContents />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-coupons",
        element: <ManageCoupons />,
      },
    ],
  },
]);
