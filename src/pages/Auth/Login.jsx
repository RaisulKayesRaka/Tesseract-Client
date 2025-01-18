import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { MdError } from "react-icons/md";

export default function Login() {
  const { setUser, userLogin, googleLogIn } = useAuth();
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Login Successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>Login | Tesseract</title>
      </Helmet>
      <section className="mx-auto flex min-h-screen w-11/12 max-w-screen-xl items-center justify-center py-8">
        <div className="mx-auto flex w-full max-w-[500px] items-center justify-center">
          <div className="w-full rounded-lg border p-8">
            <img
              onClick={() => navigate("/")}
              className="mx-auto mb-4 h-16 w-16 cursor-pointer"
              src="/tesseract.png"
              alt="Tesseract Logo"
            />
            <h1 className="pb-8 text-center text-3xl font-semibold">Log In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="email">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  className="w-full rounded-lg border px-3 py-2"
                  ref={emailRef}
                  required
                />
              </label>
              <label htmlFor="password">
                <p>Password</p>
                <div className="relative -z-10">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    id="password"
                    className="w-full rounded-lg border px-3 py-2"
                    required
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              </label>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <div>
                    <MdError />
                  </div>
                  <p>{error}</p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-black p-2 font-semibold text-white focus:scale-95"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-center">
              <hr className="h-1 w-full" /> <span className="px-4">or</span>
              <hr className="h-1 w-full" />
            </div>
            <button
              onClick={handleGoogleLogIn}
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-black p-2 font-semibold focus:scale-95"
            >
              <FaGoogle /> Continue with Google
            </button>
            <div className="mt-4 text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
