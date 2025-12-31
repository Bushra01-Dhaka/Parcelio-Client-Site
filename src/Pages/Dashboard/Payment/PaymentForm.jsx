import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useTracking from "../../../Hooks/useTracking";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { id } = useParams();
  console.log(id);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { addTracking } = useTracking();

  const {
    data: parcel = [],
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  console.log(parcel);

  const amount = parcel?.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("Payment Method: ", paymentMethod);
    }

    // create payment intent

    const res = await axiosSecure.post(`/create-payment-intent`, {
      amountInCents,
      parcelId: id,
    });

    console.log("res from intent", res);

    const clientSecret = res.data.clientSecret;

    if (!clientSecret) {
      setError("Payment initialization failed. Please try again.");
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName || "Customer",
          email: user?.email,
        },
      },
    });

    console.log("Amount", amount);

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded!", result.paymentIntent);
        console.log(result);
        // mark parcel paid and make a payment history
        const paymentData = {
          parcelId: id,
          email: user?.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
          paid_date: new Date().toISOString(),
        };

        const paymentRes = await axiosSecure.post(`/payments`, paymentData);
        if (paymentRes.data.insertedId) {
          // 🔹 ADD TRACKING AFTER PAYMENT SUCCESS
          await addTracking({
            tracking_id: parcel.tracking_id, // IMPORTANT
            step: "payment_completed",
            message: `Paid by ${user?.displayName}`,
            location: "Online Payment",
            updated_by: user?.email,
          });

          Swal.fire({
            icon: "success",
            title: "Payment Successful 🎉",
            text: `Transaction ID: ${result.paymentIntent.id}`,
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            navigate("/dashboard/userParcels");
          });
        }
      }
    }
  };

  return (
    <div className="flex justify-between min-h-[100vh] items-center w-full lg:max-w-screen-xl lg:mx-auto">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 w-full lg:w-[700px] mx-auto p-10 shadow-xl"
      >
        <CardElement className="p-3 border rounded w-full mx-auto"></CardElement>
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary text-secondary font-bold mt-4 "
        >
          Pay {amount} tk
        </button>
        {error && (
          <p className="text-center py-4 text-red-500 font-semibold text-md">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
