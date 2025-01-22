import PropTypes from "prop-types";
import { GoSidebarExpand } from "react-icons/go";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainContent({ toggleSidebar, isSidebarVisible }) {
  const navigate = useNavigate();
  return (
    <main className="w-full flex-1 bg-white">
      <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white p-4">
        {!isSidebarVisible && (
          <>
            <button
              onClick={toggleSidebar}
              aria-label="Open Sidebar"
              className="block rounded bg-gray-100 p-1 text-xl hover:bg-gray-200"
            >
              <GoSidebarExpand />
            </button>
          </>
        )}
        <section className="flex items-center justify-center gap-2">
          <img
            onClick={() => navigate("/")}
            className="h-8 w-8 cursor-pointer"
            src="/tesseract.png"
            alt=""
          />
          <h3
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-semibold"
          >
            Tesseract
          </h3>
        </section>
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </main>
  );
}

MainContent.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};
