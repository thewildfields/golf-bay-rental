import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "./PaymentForm";
import serverConnection from "../../Settings/serverConnection";

const stripe = loadStripe('pk_test_51OgwR0GpIrtQSwtJQcdRlR3rgFFxmoYBzpi7okqyhvrsI8vMFRZjEVB1gUpBSgv17nBZ2N9hYDbyip592EUXfOFp00DRcy5ZgW');

const StripePayment = (props) => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        axios.post(serverConnection.api+'/payment/create-payment-intent', {
                items: [{ id: 1, name: "momos", amount: props.price }],
            })
            .then((resp) => setClientSecret(resp.data.clientSecret));
    }, []);

    const options = {
        clientSecret,
        theme: "stripe",
    };

    return (
        clientSecret && (
            <Elements stripe={stripe} options={options}>
                <PaymentForm bookingId={props.bookingId}></PaymentForm>
            </Elements>
        )
    );
};

export default StripePayment;
