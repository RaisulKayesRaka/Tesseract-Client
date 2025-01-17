import { Helmet } from "react-helmet-async";

export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      ErrorPage
    </>
  );
}
