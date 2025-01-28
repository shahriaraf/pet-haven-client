import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import AxiosSecure from '../Hooks/AxiosSecure';


const CheckOutForm = ({ donationId, donationAmount, setShowModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = AxiosSecure();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements || !donationAmount || !donationId) {
            alert('Please enter a valid donation amount and campaign ID.');
            return;
        }
    
        const card = elements.getElement(CardElement);
        if (!card) {
            console.error('CardElement not loaded!');
            return;
        }
    
        try {
            // Assuming userEmail is available in your app's state or context
            const userEmail = 'user@example.com'; // Replace with actual user email
            const { data } = await axiosSecure.post('/create-payment', {
                donationAmount,
                donationCampaignId: donationId, // Pass the donation campaign ID
                userEmail,
            });
    
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: 'Donor Name', // Replace with real donor details
                    },
                },
            });
    
            if (error) {
                console.error('Payment failed:', error);
                alert('Payment failed. Please try again.');
                return;
            }
    
            if (paymentIntent.status === 'succeeded') {
                alert('Thank you for your donation!');
    
                // Notify backend of successful donation
                await axiosSecure.post('/donations/record', {
                    donationId,
                    amount: donationAmount,
                });
    
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Payment processing failed.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button
                type="submit"
                className="btn bg-[#6d165D] text-white py-1 px-3 mt-2 rounded-full"
            >
                Pay ${donationAmount}
            </button>
        </form>
    );
};

export default CheckOutForm;
