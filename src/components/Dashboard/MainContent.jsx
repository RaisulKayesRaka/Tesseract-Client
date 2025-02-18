import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { GoSidebarExpand } from "react-icons/go";
import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import ThemeToggle from "../ThemeToggle";

export default function MainContent({ toggleSidebar, isSidebarVisible }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <>
      <Helmet>
        <title>Dashboard | Tesseract</title>
      </Helmet>
      <main className="w-full flex-1 bg-white dark:bg-black">
        <div className="sticky top-0 z-40 flex h-16 w-full items-center gap-4 border-b bg-white p-4 dark:border-gray-700 dark:bg-black">
          {!isSidebarVisible && (
            <>
              <button
                onClick={toggleSidebar}
                aria-label="Open Sidebar"
                className="block rounded bg-gray-100 p-1 text-xl hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <GoSidebarExpand />
              </button>
            </>
          )}
          <section className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              {theme === "dark" ||
              (theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
                <img
                  onClick={() => navigate("/")}
                  className="h-8 w-8 cursor-pointer"
                  src="/tesseract-white.png"
                  alt=""
                />
              ) : (
                <img
                  onClick={() => navigate("/")}
                  className="h-8 w-8 cursor-pointer"
                  src="/tesseract.png"
                  alt=""
                />
              )}
              <h3
                onClick={() => navigate("/")}
                className="cursor-pointer text-2xl font-semibold"
              >
                Tesseract
              </h3>
            </div>
            <div>
              <ThemeToggle />
            </div>
          </section>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}

MainContent.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};
