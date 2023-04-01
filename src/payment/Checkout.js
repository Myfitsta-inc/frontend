import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import LoadingSpin from "../component/loadingspin";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const PUBLISHABLE_SECRET_KEY =
  "pk_test_51MrtFTGyHtLXkF2fevK0G8sKxn1UV6uisihinGI85gTo2VOsmPb9vFrVbGIlSY6Nf8AEXvEr2ucraeq27WoG9urF00BMx48wSi";
const email = "kenneth@gmail.com";
const name = "kenneth";
function Checkout({ user }) {
  const { email, Username } = user;
  const [stipePromise, setStipePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStipePromise(loadStripe(PUBLISHABLE_SECRET_KEY));
  }, []);

  //   useEffect(() => {
  //     const fetch = async () => {
  //       const { data } = await axios.post("/api/create-payment-intent", {});
  //       const { clientSecret } = data;
  //       setClientSecret(clientSecret);
  //     };
  //     fetch();
  //   }, []);

  useEffect(() => {
    const fetch = async () => {
      const payload = {
        name: Username,
        email,
        priceId: "price_1Mrz9eGyHtLXkF2fpsBNnu5r",
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
      <CheckoutForm />
    </Elements>
  ) : (
    <div className="wraping-button">
      <LoadingSpin />
    </div>
  );
}

export default Checkout;
