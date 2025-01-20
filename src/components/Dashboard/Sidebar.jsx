import PropTypes from "prop-types";
import { GoSidebarCollapse } from "react-icons/go";
import useAuth from "../../hooks/useAuth";

export default function Sidebar({ toggleSidebar }) {
  const { user, logOut } = useAuth();
  return (
    <aside
      id="sidebar"
      className="fixed top-0 z-50 max-h-screen min-h-full w-72 bg-white shadow sm:sticky"
    >
      <div className="flex h-16 items-center gap-4 p-4">
        <button
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
          className="rounded bg-gray-100 p-1 text-xl hover:bg-gray-200"
        >
          <GoSidebarCollapse />
        </button>
      </div>
      <section className="flex h-[calc(100vh-64px)] flex-col">
        <div className="flex-1 bg-rose-100"></div>
        <hr />
        <div className="w-full rounded-lg p-4">
          <div className="flex items-center justify-center">
            <img
              className="h-24 w-24 rounded-full"
              src={user?.photoURL}
              alt=""
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="px-4 py-3 text-center font-semibold">
              {user?.displayName}
            </p>
            {/* <hr /> */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  logOut();
                }}
                className="block rounded-lg bg-gray-800 px-4 py-2 text-center text-sm text-white hover:bg-black focus:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}

Sidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
