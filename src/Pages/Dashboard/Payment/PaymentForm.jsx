import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
   const {id} = useParams();
  console.log(id);

  const axiosSecure = useAxiosSecure();

  const {data: parcel = [], isLoading, isPending} = useQuery({
    queryKey:["parcels", id],
    queryFn: async() => {
        const res = await axiosSecure.get(`/parcels/${id}`);
        return res.data;
    }
  })


  if(isPending){
    return <span className="loading loading-spinner loading-xl"></span>
  }

   console.log(parcel)

   const amount = parcel?.cost;
   const amountInCents = amount*100;
   console.log(amountInCents)
  

  

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
    } 
    else {
      setError('');
      console.log("Payment Method: ", paymentMethod);
    }

    // create payment intent 

    const res = await axiosSecure.post(`/create-payment-intent`,{
      amountInCents,
      parcelId: id
    })

    console.log("res from intent",res);

    const clientSecret = res.data.clientSecret;

  if (!clientSecret) {
setError("Payment initialization failed. Please try again.");
return;
}

    const result = await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card: elements.getElement(CardElement),
        billing_details: {
           name: parcel?.senderName || "Customer"
        }
      }
    })

    if(result.error){
      console.log(result.error.message)
    }
    else{
      if(result.paymentIntent.status === 'succeeded'){
        console.log("Payment Succeeded!", result.paymentIntent)
        console.log(result);
      }
    }






  };

  return (
    <div className="flex justify-between items-start w-full lg:max-w-screen-xl lg:mx-auto">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 w-full p-10 shadow-xl"
      >
        <CardElement className="p-3 border rounded w-full mx-auto"></CardElement>
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary text-secondary font-bold mt-4 "
        >
          Pay {amount} tk
        </button>
        {
            error && <p className="text-center py-4 text-red-500 font-semibold text-md">{error}</p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;
