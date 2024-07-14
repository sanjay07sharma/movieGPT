import OpenAI from 'openai';

export const openAi = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_API_KEY,
  dangerouslyAllowBrowser: true, // This is required for browser use
});
