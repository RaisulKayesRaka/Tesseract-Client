import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const location = useLocation();
  console.log(location);
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Outlet />
    </>
  );
}
