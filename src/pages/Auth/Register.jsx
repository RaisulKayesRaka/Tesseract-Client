import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { MdError } from "react-icons/md";

export default function Register() {
  const { setUser, createNewUser, updateUserProfile, googleLogIn } = useAuth();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photoUrl = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!regex.test(password)) {
      setError(
        "Invalid password! Password must be at least 6 characters and include uppercase and lowercase letters.",
      );
      return;
    }

    createNewUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photoUrl }).then(
          () => {
            toast.success("Registration successful!");
            navigate(location?.state ? location.state : "/");
          },
        );
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
        <title>Register | Tesseract</title>
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
            <h1 className="pb-8 text-center text-3xl font-semibold">
              Register
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="" htmlFor="name">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name"
                  className="w-full rounded-lg border px-3 py-2"
                  required
                />
              </label>
              <label htmlFor="photoUrl">
                <p>Photo URL</p>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="Photo URL"
                  id="photoUrl"
                  className="w-full rounded-lg border px-3 py-2"
                  required
                />
              </label>

              <label htmlFor="email">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  className="w-full rounded-lg border px-3 py-2"
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

              <div className="">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-black p-2 font-semibold text-white focus:scale-95"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-center">
              <hr className="h-1 w-full" /> <span className="px-4">or</span>
              <hr className="h-1 w-full" />
            </div>
            <button
              onClick={handleGoogleLogIn}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-black p-2 font-semibold focus:scale-95"
            >
              <FaGoogle /> Continue with Google
            </button>
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
