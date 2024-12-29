import express from 'express';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QUPSjA9DcKAmMmGuUB9SRoGJemfqRAIqzJ9A2N63lYGTwsVBuDO9AtwqnenALEwRrwq8vKpswvlxvX0N1b3sEiO00FoEsutpL');

const app = express();
const router = express.Router()

router.post('/payment-sheet', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount || !currency) {
            return res.status(400).send({ error: 'Amount and currency are required.' });
        }

        // Step 1: Create a customer
        const customer = await stripe.customers.create();

        // Step 2: Create an ephemeral key
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2024-04-10' } // Ensure you use the latest valid API version
        );

        // Step 3: Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            customer: customer.id,
            payment_method_types: ['card'],
        });

        // Respond with payment details
        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    } catch (error) {
        console.error('Error in /payment-sheet:', error);
        res.status(500).send({ error: error.message });
    }
});

export default router;