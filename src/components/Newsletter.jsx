import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <div className="mx-auto my-12 w-11/12 max-w-screen-xl rounded-lg border bg-gray-50 px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900 md:px-12">
      <h2 className="text-2xl font-semibold">Stay Updated!</h2>
      <p className="mt-2 text-base">
        Subscribe to our newsletter and never miss an update on the latest tech
        products.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex w-full max-w-lg flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-black sm:w-80"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black sm:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
