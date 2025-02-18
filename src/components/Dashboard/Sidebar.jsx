import PropTypes from "prop-types";
import { GoSidebarCollapse } from "react-icons/go";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { FaUser, FaUsersCog } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdLibraryAddCheck, MdRateReview } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { TbMessageReportFilled } from "react-icons/tb";
import { RiCoupon2Fill } from "react-icons/ri";
import useRole from "../../hooks/useRole";

export default function Sidebar({ toggleSidebar }) {
  const { user, logOut } = useAuth();
  const [role] = useRole();

  return (
    <aside
      id="sidebar"
      className="fixed top-0 z-50 max-h-screen min-h-full min-w-72 bg-white shadow dark:bg-black dark:shadow-white sm:sticky"
    >
      <div className="flex h-16 items-center gap-4 p-4">
        <button
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
          className="rounded bg-gray-100 p-1 text-xl hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <GoSidebarCollapse />
        </button>
      </div>
      <section className="flex h-[calc(100vh-64px)] flex-col">
        <section className="flex-1 px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            {role === "user" && (
              <>
                <NavLink
                  to="my-profile"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <FaUser /> <p>My Profile</p>
                </NavLink>
                <NavLink
                  to="add-product"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <MdLibraryAddCheck />
                  <p>Add Product</p>
                </NavLink>
                <NavLink
                  to="my-products"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <AiFillProduct /> <p>My Products</p>
                </NavLink>
              </>
            )}

            {role === "moderator" && (
              <>
                <NavLink
                  to="product-review-queue"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <MdRateReview /> <p>Product Review Queue</p>
                </NavLink>
                <NavLink
                  to="reported-contents"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <TbMessageReportFilled />
                  <p>Reported Contents</p>
                </NavLink>
              </>
            )}

            {role === "admin" && (
              <>
                <NavLink
                  to="manage-users"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <FaUsersCog /> <p>Manage Users</p>
                </NavLink>
                <NavLink
                  to="manage-coupons"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <RiCoupon2Fill /> <p>Manage Coupons</p>
                </NavLink>
                <NavLink
                  to="statistics"
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-lg px-4 py-2 text-center ${
                      isActive
                        ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`
                  }
                >
                  <IoStatsChart />
                  <p>Statistics</p>
                </NavLink>
              </>
            )}
          </div>
        </section>
        <hr className="dark:border-gray-700" />
        <section className="w-full rounded-lg p-4">
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
            <div className="flex flex-col">
              <button
                onClick={() => {
                  logOut();
                }}
                className="block rounded-lg bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:bg-gray-800 focus:scale-95 dark:bg-white dark:text-black"
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      </section>
    </aside>
  );
}

Sidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
