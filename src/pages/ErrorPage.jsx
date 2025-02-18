import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <section className="mx-auto flex h-screen w-11/12 max-w-screen-xl flex-col items-center justify-center">
        <img
          onClick={() => navigate("/")}
          className="w-32 cursor-pointer sm:w-36 md:w-40 lg:w-48"
          src="./page-not-found.svg"
          alt="Page Not Found"
        />
        <h1 className="mb-1 mt-4 text-2xl font-bold">Page Not Found</h1>
        <p className="text-center text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          class="mt-4 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:scale-95"
        >
          Back to Home
        </Link>
      </section>
    </>
  );
}
