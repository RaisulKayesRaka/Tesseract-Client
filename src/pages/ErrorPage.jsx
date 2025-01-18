import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <section className="flex h-screen items-center justify-center">
        <img
          onClick={() => navigate("/")}
          className="w-32 cursor-pointer sm:w-36 md:w-40 lg:w-48"
          src="../../src/assets/page-not-found.svg"
          alt="Page Not Found"
        />
      </section>
    </>
  );
}
