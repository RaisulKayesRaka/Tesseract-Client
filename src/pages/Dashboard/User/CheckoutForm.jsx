import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ handleCloseModal, amount, refetchIsVerified }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axiosSecure
      .post("/create-payment-intent", { amount })
      .then(({ data }) => setClientSecret(data?.clientSecret));
  }, [axiosSecure, amount]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setProcessing(false);
      return console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (paymentIntent.status === "succeeded") {
      try {
        const { data } = await axiosSecure.put(
          `/users/verify?email=${user?.email}`,
        );
        if (data?.modifiedCount > 0) {
          refetchIsVerified();
          toast.success("Payment successful");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setProcessing(false);
        handleCloseModal();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "14px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="mt-2">
        <button
          disabled={!stripe || !clientSecret || processing}
          type="submit"
          className="block w-full rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 dark:bg-white dark:text-black dark:disabled:bg-gray-700 disabled:dark:text-gray-600"
        >
          Pay ${amount}
        </button>
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  refetchIsVerified: PropTypes.func.isRequired,
};

export default CheckoutForm;
