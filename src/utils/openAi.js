import OpenAI from 'openai';
import {OPENAI_KEY} from './constants';

export const openAi = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true, // This is required for browser use
});
