import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseCart from "../../../hooks/UseCart";
import UseAxios from "../../../hooks/UseAxios";
import useAuth from "../../../hooks/useAuth";

const ChackOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState("");
  const elements = useElements();
  const axiosSecure = UseAxios();
  const [cart] = UseCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log("Client Secret", res.data.clientSecret); // Debugging log
          console.log(res.data)
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error fetching client secret:", err);
        });
    }
  }, [ totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded!");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("Card element not found!");
      return;
    }

    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentError) {
      console.error("Payment Method Error:", paymentError);
      setError(paymentError.message);
      return;
    } else {
      console.log("Payment Method:", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Payment Confirmation Error:", confirmError);
      setError(confirmError.message);
    } else {
      console.log("Payment Intent:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("Transaction ID:", paymentIntent.id);
        setTransactionId(paymentIntent.id); // Set transaction ID after success
        setError("");

        //  now save the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: payment.id,
          date: new Date(),
          cartId: cart.map((item) => item._id),
          menuIteId: cart.map((item) => item.menuId),
          status: "pending",
        };
        const res =await axiosSecure.post('/payments' , payment)
        console.log('payment saved' , res)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
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
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default ChackOutForm;
