// import Razorpay from 'razorpay';
import { useState } from 'react';
import { RAZORPAY_OPTIONS } from '../utils/constants';

const plans = [
  {
    name: 'Premium',
    resolution: '4K + HDR',
    monthlyPrice: '₹649',
    videoSoundQuality: 'Best',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    devicesAtSameTime: 4,
    downloadDevices: 6,
  },
  {
    name: 'Standard',
    resolution: '1080p',
    monthlyPrice: '₹499',
    videoSoundQuality: 'Great',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    devicesAtSameTime: 2,
    downloadDevices: 2,
  },
  {
    name: 'Basic',
    resolution: '720p',
    monthlyPrice: '₹199',
    videoSoundQuality: 'Good',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    devicesAtSameTime: 1,
    downloadDevices: 1,
  },
  {
    name: 'Mobile',
    resolution: '480p',
    monthlyPrice: '₹149',
    videoSoundQuality: 'Fair',
    supportedDevices: 'Mobile phone, tablet',
    devicesAtSameTime: 1,
    downloadDevices: 1,
  },
];

const ChooseAPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (plan) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      ...RAZORPAY_OPTIONS,
      amount: plan.monthlyPrice.replace('₹', '') * 100, // Amount in paise
      handler: (response) => handlePaymentSuccess(response.razorpay_payment_id),
      modal: {
        ondismiss: () => console.log('Transaction cancelled'),
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    displayRazorpay(plan);
  };

  const handlePaymentSuccess = (paymentId) => {
    console.log(`Payment successful: ${paymentId}`);
    // Handle payment success logic here
  };

  return (
    <div className="h-[75%] pt-[30%] md:pt-[15%] md:w-full md:mx-auto p-4 sm:p-8 relative">
      <h1 className="md:text-3xl font-bold mb-8 text-center text-white">Choose the plan that's right for you</h1>
      <div className="w-76 h-36 flex flex-wrap justify-center md:space-x-6 space-y-4">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative w-full sm:w-80 p-6 bg-white rounded-lg shadow-md ${index === 2 ? 'border-4 border-purple-500' : ''} cursor-pointer hover:shadow-lg transition-shadow duration-200`}
            onClick={() => handlePlanClick(plan)}
          >
            {index === 2 && (
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-sm font-bold py-1 px-4 rounded-full">
                Most Popular
              </div>
            )}
            <h2 className={`text-2xl font-bold mb-2 ${index === 2 ? 'text-purple-600' : 'text-blue-600'}`}>{plan.name}</h2>
            <hr className="my-2"/>
            <p className="text-gray-600 mb-2">{plan.resolution}</p>
            <hr className="my-2"/>
            <p className="text-2xl font-bold mb-4">₹{plan.monthlyPrice}</p>
            <hr className="my-2"/>
            <p className="text-gray-600 mb-2">Video and sound quality: {plan.videoSoundQuality}</p>
            <hr className="my-2"/>
            <p className="text-gray-600 mb-2">Supported devices: {plan.supportedDevices}</p>
            <hr className="my-2"/>
            <p className="text-gray-600 mb-2">Devices your household can watch at the same time: {plan.devicesAtSameTime}</p>
            <hr className="my-2"/>
            <p className="text-gray-600">Download devices: {plan.downloadDevices}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseAPlan;
