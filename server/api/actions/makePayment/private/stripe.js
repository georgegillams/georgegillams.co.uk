import stripe from 'stripe';

const { STRIPE_SECRET_API_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_API_KEY);

export default stripeInstance;
