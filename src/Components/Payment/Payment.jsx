import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK)
const Payment = ({ donationId, donationAmount, setShowModal }) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOutForm
                    donationId={donationId}
                    donationAmount={donationAmount}
                    setShowModal={setShowModal}
                />
            </Elements>
        </div>
    );
};

export default Payment;
