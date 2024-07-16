import Razorpay from 'razorpay';
import { useState } from 'react';

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
  const [showRazorpay, setShowRazorpay] = useState(false);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = (paymentId) => {
    console.log(`Payment successful: ${paymentId}`);
    // Handle payment success logic here
  };

  const handlePaymentError = (error) => {
    console.log(`Payment error: ${error}`);
    // Handle payment error logic here
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Choose the plan that's right for you</h1>
      <div className="flex flex-wrap -mx-4">
        {plans.map((plan) => (
          <div key={plan.name} className="w-full md:w-1/2 xl:w-1/4 p-4 sm:p-6">
            <div
              className="bg-white rounded shadow-md p-4 sm:p-6 cursor-pointer"
              onClick={() => handlePlanClick(plan)}
            >
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <p className="text-gray-600">{plan.resolution}</p>
              <p className="text-lg font-bold">Monthly price: {plan.monthlyPrice}</p>
              <p className="text-gray-600">Video and sound quality: {plan.videoSoundQuality}</p>
              <p className="text-gray-600">Supported devices: {plan.supportedDevices}</p>
              <p className="text-gray-600">Devices your household can watch at the same time: {plan.devicesAtSameTime}</p>
              <p className="text-gray-600">Download devices: {plan.downloadDevices}</p>
            </div>
          </div>
        ))}
      </div>
      {showRazorpay && (
        <Razorpay
          amount={selectedPlan.monthlyPrice}
          currency="INR"
          name="Netflix"
          description="Monthly subscription"
          handler={(response) => handlePaymentSuccess(response.razorpay_payment_id)}
          modal={{
            ondismiss: () => setShowRazorpay(false),
          }}
        />
      )}
    </div>
  );
};

export default ChooseAPlan;
