import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new stripe(process.env.STRIPE_SECRET_KEY)({
 apiversion: '2024-08-01',
});

export default stripe; 



