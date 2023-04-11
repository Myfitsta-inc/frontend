import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import LoadingSpin from "components/loadingspin";
import axios from "axios";
function CheckoutForm({ plan, publisherId, userId }) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
      redirect: "if_required",
    });
    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const { payment_method } = paymentIntent;
      let payload = {
        planName: plan,
        publisherId,
        subScriberId: userId,
        paymentMethod: payment_method,
      };
      await axios.post("/api/createSubscription", payload, {
        withCredentials: true,
      });

      window.location.reload();
    }
    setLoading(false);
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement className="payment-element" />
      <div className="button-container">
        {errorMessage.length ? (
          <p className="hold-that-mess active">{errorMessage}</p>
        ) : (
          ""
        )}
        <input
          disabled={loading}
          type="submit"
          className={`button button--small button--green ${
            loading  ? "loading" : ""
          }`}
          value={`${loading  ? "" : "SUBSCRIBE"}`}
          id="submit"
        />
        {loading  ? (
          <div className="jietiooeo">
            {" "}
            <LoadingSpin />
          </div>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default CheckoutForm;
