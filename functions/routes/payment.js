const express = require('express');
const router = express.Router();

require('dotenv').config();
const stripe = require("stripe")('sk_test_51OgwR0GpIrtQSwtJ94zQxi56igBkz9pcZLqSuLa8c6R26OdDJAF1WWh2MocIyCjkDGs0QNHD8ppswsvmkofuJzyn00TlTfAiQp');

const calculateTotalOrderAmount = (items) => {
    return items[0].amount * 100;
};


router.post('/create-payment-intent', async (req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateTotalOrderAmount(items),
        currency: "usd",
        description: "This is for Golf Bay Rentals Stripe API Demo",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
})

module.exports = router;