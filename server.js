require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
});

app.post('/createOrder', async (req, res) => {
  const { amount, currency, receipt, payment_capture } = req.body;
  try {
    const options = {
      amount: amount * 100, // Amount in smallest currency unit
      currency,
      receipt,
      payment_capture,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(cors({
  origin: 'http://localhost:3000', // or your frontend's URL
}));

app.listen(3001, () => {
  console.log('Server running on port 3000');
});
