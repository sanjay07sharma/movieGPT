export const LOGO_URL = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR = "https://occ-0-2087-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4";

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer` + process.env.REACT_APP_TMDB_TOKEN,
    'Content-Type': 'application/json'
  }
};

export const POSTER_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const SUPPORTED_LANGUAGES = [
    {identifier : "en", name : "English"},
    {identifier : "hi", name : "Hindi"},
    {identifier : "es", name : "Spanish"},
    {identifier : "fr", name : "French"},
    {identifier : "de", name : "German"},
    {identifier : "ur", name : "Urdu"},
    {identifier : "ru", name : "Russian"},
    {identifier : "mr", name : "Marathi"},
    {identifier : "ta", name : "Tamil"},
    {identifier : "bn", name : "Bengali"},
    {identifier : "te", name : "Telugu"},
    {identifier : "gu", name : "Gujarati"},
    {identifier : "kn", name : "Kannada"},
]


export const RAZORPAY_OPTIONS  = {
    key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
    key_secret: process.env.REACT_APP_RAZORPAY_KEY_ID,
    currency: "INR",
    name: "Netflix",
    description: "Test Transaction",
    order_id: "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",// 
    prefill: {
        "name": "Admin",
        "email": "admin@gmail.com.com",
        "contact": "9000090000"
    },
    notes: {
        "address": "Razorpay Corporate Office"
    },
    theme: {
        "color": "#3399cc"
    }
};

export const ANTHROPIC_API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;
