import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import LoadingSpin from "../component/loadingspin";
import axios from "axios";
function CheckoutForm({ plan, publisherId, userId }) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
      redirect: "if_required",
    });
    if (error) {
      console.log(error);
    } else if (paymentIntent && paymentIntent.status == "succeeded") {
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
        <input
          disabled={loading}
          type="submit"
          className={`button button--small button--green ${
            loading === true ? "loading" : ""
          }`}
          value={`${loading === true ? "" : "SUBSCRIBE"}`}
          id="submit"
        />
        {loading === true ? (
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
