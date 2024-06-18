

import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();

    const putRequest = async () => {
        const res = await axios.put(`/api/orders/${id}/pay`);
        return res;
    };

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            // confirmParams: {
            //     return_url: `${window.location.origin}/`,
            // },
            redirect: 'if_required'
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            await putRequest();
            console.log('succeeded');
            setMessage("Payment succeeded!");
        } else {
            setMessage("Payment failed or was not completed.");
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isProcessing ? "Processing..." : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
