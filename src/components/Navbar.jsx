import { useState, useEffect, useRef } from "react";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const user = {
    email: "user@example.com",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 border-b bg-white py-5">
        <div className="mx-auto flex w-11/12 max-w-screen-xl items-center justify-between">
          <section className="flex items-center justify-center gap-2">
            <img className="h-9 w-9" src="/tesseract.png" alt="" />
            <h3 className="text-3xl font-semibold">Tesseract</h3>
          </section>
          <section className="flex items-center gap-8">
            <a className="hidden sm:block" href="">
              Home
            </a>
            <a href="" className="hidden sm:block">
              Products
            </a>
            {user?.email ? (
              <div
                ref={dropdownButtonRef}
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="relative hidden h-9 w-9 cursor-pointer rounded-full sm:block"
              >
                <img
                  className="h-9 w-9 cursor-pointer rounded-full border"
                  src="https://placehold.co/36"
                  alt=""
                />
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-12 flex min-w-56 flex-col rounded-lg border bg-white py-2"
                  >
                    <p className="px-4 py-3 font-semibold">Raisul Kayes Raka</p>
                    <hr />
                    <a
                      href=""
                      className="mt-2 px-4 py-2 text-black hover:bg-gray-50 focus:scale-95"
                    >
                      Dashboard
                    </a>
                    <a
                      href=""
                      className="px-4 py-2 text-black hover:bg-gray-50 focus:scale-95"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <button className="hidden rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 focus:scale-95 sm:block">
                Login
              </button>
            )}

            <button
              onClick={() => setOpen(true)}
              className="text-3xl sm:hidden"
            >
              <IoMenuOutline />
            </button>
          </section>
          <section
            className={`fixed left-0 top-0 z-10 block h-screen w-full bg-white transition-all duration-500 ease-in-out sm:hidden ${
              open ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex h-full flex-col p-6">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-6 top-6 text-3xl"
              >
                <IoCloseOutline />
              </button>
              <div className="mt-12 flex-1 text-center">
                <a className="block py-3" href="">
                  Home
                </a>
                <a className="block py-3" href="">
                  Product
                </a>
              </div>
              {user.email ? (
                <div className="w-full rounded-lg border py-4">
                  <div className="flex items-center justify-center">
                    <img
                      className="h-24 w-24 rounded-full"
                      src="https://placehold.co/96"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="px-4 py-3 text-center font-semibold">
                      Raisul Kayes Raka
                    </p>
                    <hr />
                    <div className="flex flex-col">
                      <a
                        href=""
                        className="mt-2 px-4 py-2 text-center text-black hover:bg-gray-50 focus:scale-95"
                      >
                        Dashboard
                      </a>
                      <button
                        onClick={() => {
                          setOpen(false);
                        }}
                        className="block px-4 py-2 text-center text-black hover:bg-gray-50 focus:scale-95"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button className="block rounded-lg bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:bg-gray-800 focus:scale-95">
                  Login
                </button>
              )}
            </div>
          </section>
        </div>
      </nav>
    </>
  );
}
