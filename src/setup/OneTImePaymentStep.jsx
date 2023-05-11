import React, { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import useUser from "hooks/useUser";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import LoadingSpin from "Components/Loadingspin";

function OneTImePaymentStep() {
  const [stipePromise, setStipePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/api/stripe/config");
      const { PUBLISHABLE_SECRET_KEY } = data;
      setStipePromise(loadStripe(PUBLISHABLE_SECRET_KEY));
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.post("/api/create_one_time_payment_intent");
      const { clientSecret } = data;
      setClientSecret(clientSecret);
    };
    fetch();
  }, []);
  return stipePromise && clientSecret ? (
    <Elements stripe={stipePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  ) : (
    <div className="wraping-button">
      <LoadingSpin />
    </div>
  );
}

export default OneTImePaymentStep;

function CheckoutForm() {
  const { user } = useUser();
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
      let payload = {};

      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="wrpaeorrr">
      <div className="theslider">
        <div className="wwwr-text">One Time Fee</div>
      </div>

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
              loading ? "loading" : ""
            }`}
            value={`${loading ? "" : "JOIN MYFITSTAPRO"}`}
            id="submit"
          />
          {loading ? (
            <div className="jietiooeo">
              {" "}
              <LoadingSpin />
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
