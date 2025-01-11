import React from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ChackOutForm from './ChackOutForm';


// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="payment" subHeading="Please Pay fast"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                <ChackOutForm />
                </Elements>
            </div>
        </div>
        
    );
};

export default Payment;