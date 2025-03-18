import { useState } from 'react';
import { RAZORPAY_OPTIONS } from '../utils/constants';
const Razorpay = require('razorpay');

const plans = [
  {
    name: 'Premium',
    resolution: '4K + HDR',
    monthlyPrice: 649,
    videoSoundQuality: 'Best',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    devicesAtSameTime: 4,
    downloadDevices: 6,
  },
  {
    name: 'Standard',
    resolution: '1080p',
    monthlyPrice: 499,
    videoSoundQuality: 'Great',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    devicesAtSameTime: 2,
    downloadDevices: 2,
  },
  {
    name: 'Basic',
    resolution: '720p',
    monthlyPrice: 199,
    videoSoundQuality: 'Good',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    devicesAtSameTime: 1,
    downloadDevices: 1,
  },
  {
    name: 'Mobile',
    resolution: '480p',
    monthlyPrice: 149,
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
    await loadRazorpayScript();
    var options = {
      "key_id": process.env.REACTAPP_RAZORPAY_KEY_ID,
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
    var rzp1 = new Razorpay({"key_id":process.env.REACTAPP_RAZORPAY_KEY_ID});
    rzp1.open();
  };

  const handlePlanClick = async (plan) => {
    setSelectedPlan(plan);
    await displayRazorpay(plan);
  };

  const handlePaymentSuccess = (paymentId) => {
    console.log(`Payment successful: ${paymentId}`);
    // Handle payment success logic here
  };

  return (
    <div className="h-[75%] pt-[30%] md:pt-[15%] md:w-full md:mx-auto p-4 sm:p-8 relative">
      <h1 className="md:text-3xl font-bold mb-8 text-center text-white">Choose the plan that's right for you</h1>
      <div className="w-76 h-36 flex flex-wrap justify-center md:space-x-6">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`w-full sm:w-80 p-6 bg-white rounded-lg shadow-md ${index === 2 ? 'border-4 border-purple-500' : ''} cursor-pointer hover:shadow-lg transition-shadow duration-200`}
            onClick={() => handlePlanClick(plan)}
          >
            {index === 2 && (
              <div className="ml-36 w-36 bg-purple-500 text-white text-sm font-bold px-4 mt-[-9%] rounded-full">
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
