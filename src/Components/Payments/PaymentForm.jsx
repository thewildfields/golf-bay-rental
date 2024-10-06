import { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import serverConnection from "../../Settings/serverConnection";

const PAYMENT_SUCESS_URL = "http://localhost:5173/payment-success";

const PaymentForm = ({newBookingId}) => {


    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingId, setBookingId] = useState(newBookingId);

    useEffect(() => {
        setBookingId(newBookingId)
    },[newBookingId]);

    const updatePaymentStatus = (status) => {
        axios.put(
            serverConnection.api+`/booking/${bookingId}`,
            {paymentStatus: status}
        )
            .then(response => console.log(response.data))
            .catch(err => console.error(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        setMessage("Payment in Progress");

        const resp = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: PAYMENT_SUCESS_URL,
            },
        });

        if (resp.error) setMessage("Some Error Occurred !!");
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="card w-100 bg-base-100 bg-gray-200 shadow-2xl rounded-lg">
                    <div className="card-body p-6">
                        <h1 className="card-title font-bold text-2xl mb-4 justify-center">
                            Complete your payment here!
                        </h1>
                        <PaymentElement />
                        <div className="card-actions justify-center">
                            <button
                                className="btn btn-primary rounded-xl text-white px-4 py-2 mt-6"
                                disabled={isLoading || !stripe || !elements}
                            >
                                {isLoading ? "Loading..." : "Pay now"}
                            </button>
                        </div>
                        {message && <div>{message}</div>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
