"use client"

import { Button } from "@/components/ui/button";
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function OnboardingStep2() {
  const router = useRouter();

  const handleSubscribe = async () => {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
    });
    const { sessionId } = await response.json();
    
    const stripe = await stripePromise;
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscribe to Ledgrly Pro</h1>
          <p className="text-gray-600 mt-2">
            Unlock powerful features to automate your Etsy bookkeeping.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Pro Monthly</h2>
            <p className="text-4xl font-bold text-gray-900 mt-4">
              $19.99<span className="text-lg font-medium text-gray-500">/month</span>
            </p>
          </div>

          <ul className="mt-8 space-y-4 text-gray-600">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Unlimited Etsy Shop Syncing</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Profit & Loss Dashboard</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Schedule C CSV Export</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Sales Tax Summaries</span>
            </li>
          </ul>

          <div className="mt-8">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-4">
            <Button variant="link" onClick={() => router.push('/onboarding/step-3')}>
                Skip for now
            </Button>
        </div>
      </div>
    </div>
  );
} 