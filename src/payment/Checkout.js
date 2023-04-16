import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import LoadingSpin from "Components/Loadingspin";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function Checkout({ user, plan, publisherId }) {
  const { email, userId } = user;
  const { price } = plan;
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
      const payload = {
        name: userId,
        email,
        price,
      };
      const { data } = await axios.post(
        "/api/create-subscription-intent",
        payload
      );
      const { clientSecret } = data;
      setClientSecret(clientSecret);
    };
    fetch();
  }, []);
  return stipePromise && clientSecret ? (
    <Elements stripe={stipePromise} options={{ clientSecret }}>
      <CheckoutForm
        userId={user.userId}
        publisherId={publisherId}
        plan={plan}
      />
    </Elements>
  ) : (
    <div className="wraping-button">
      <LoadingSpin />
    </div>
  );
}

export default Checkout;
