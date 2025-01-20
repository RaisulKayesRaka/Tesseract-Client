import PropTypes from "prop-types";
import { GoSidebarExpand } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function MainContent({ toggleSidebar, isSidebarVisible }) {
  const navigate = useNavigate();
  return (
    <main className="flex-1 bg-white">
      
      <div className="flex h-16 items-center gap-4 p-4 bg-white sticky top-0 z-40 border-b">
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
      
      <div className="p-4">Right Side Content</div>
    </main>
  );
}

MainContent.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};
