import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiShieldCheck } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function MyProfile() {
  const [couponCode, setCouponCode] = useState("");
  const axiosSecure = useAxiosSecure();
  const [couponStatus, setCouponStatus] = useState("");
  const { user, loading } = useAuth();
  const { data: isVerified = false, refetch: refetchIsVerified } = useQuery({
    queryKey: ["isVerified", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data?.isVerified;
    },
  });

  const { data: amount = 1 } = useQuery({
    queryKey: ["amount", couponCode],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/subscription-amount?couponCode=${couponCode}`,
      );
      return data?.amount;
    },
  });

  const handleCloseModal = () => {
    document.getElementById("subscribe-modal").classList.add("hidden");
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    setCouponCode(e.target.couponCode.value);

    const { data } = await axiosSecure.get(
      `/coupons/${e.target.couponCode.value}`,
    );
    setCouponStatus(data?.status);
  };

  return (
    <>
      <Helmet>
        <title>My Profile | Tesseract</title>
      </Helmet>
      <section className="flex h-[calc(100vh-96px)] items-center justify-center">
        <div className="flex w-full flex-col items-center">
          <div className="mb-4">
            <img
              className="h-32 w-32 rounded-full border dark:border-gray-700"
              src={user?.photoURL}
              alt=""
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-2xl font-semibold">{user?.displayName}</h3>
          <p className="text-sm">{user?.email}</p>

          {isVerified ? (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-green-500 bg-green-50 px-3 py-1 text-sm font-semibold text-green-500">
                Verified <HiShieldCheck />
              </span>
            </div>
          ) : (
            <div className="mt-4 flex w-full max-w-96 flex-col items-center justify-center gap-2 rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <h3>Subcribe for membership</h3>
              <button
                onClick={() => {
                  document
                    .getElementById("subscribe-modal")
                    .classList.remove("hidden");
                }}
                className="rounded-lg bg-black px-4 py-2 font-semibold text-white dark:bg-white dark:text-black"
              >
                Subscribe ${amount}
              </button>
            </div>
          )}
        </div>
      </section>
      <section
        id="subscribe-modal"
        className="fixed inset-0 z-50 hidden h-screen w-full bg-black/50 transition-all duration-300 dark:bg-white/10"
      >
        <div className="flex h-full items-center justify-center">
          <div className="relative m-4 w-full max-w-md rounded-lg bg-white p-4 dark:bg-black">
            <button
              onClick={() => {
                document
                  .getElementById("subscribe-modal")
                  .classList.add("hidden");
              }}
              className="absolute right-4 top-4 rounded-full bg-black p-1.5 font-semibold text-white hover:bg-gray-800 focus:scale-95 dark:bg-white dark:text-black"
            >
              <IoClose />
            </button>
            <h2 className="my-4 block text-lg font-semibold">Pay ${amount}</h2>

            <div className="my-4">
              <form
                onSubmit={handleCoupon}
                action=""
                className="flex items-center gap-2"
              >
                <input
                  onFocus={() => setCouponStatus("")}
                  type="text"
                  name="couponCode"
                  placeholder="Enter coupon code"
                  className="inline-block w-full rounded-lg border px-3 py-2 text-sm hover:border-black dark:border-gray-700 dark:bg-black"
                />
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-black px-3 py-2 text-sm text-white dark:bg-white dark:text-black"
                >
                  Apply
                </button>
              </form>
              {couponStatus === "valid" && (
                <p className="mt-1 text-[12px] text-green-500">
                  Coupon applied
                </p>
              )}
              {couponStatus === "invalid" && (
                <p className="mt-1 text-[12px] text-red-500">Coupon invalid</p>
              )}
              {couponStatus === "expired" && (
                <p className="mt-1 text-[12px] text-red-500">Coupon expired</p>
              )}
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                handleCloseModal={handleCloseModal}
                amount={amount}
                refetchIsVerified={refetchIsVerified}
              />
            </Elements>
          </div>
        </div>
      </section>
    </>
  );
}
