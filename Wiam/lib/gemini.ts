import Constants from 'expo-constants';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Import your JSON data files (make sure the file paths are correct)
import transactionsData from '../data/transactions.json';
import brandsData from '../data/brand.json';
import storesData from '../data/store.json';

export async function getGeminiResponse(question: string): Promise<string> {
  // Get the API key from environment variables
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Missing Gemini API Key');
    return 'Missing API key. Please add EXPO_PUBLIC_GEMINI_API_KEY to your environment.';
  }

  // Convert the JSON data into formatted strings.
  const transactionsJson = JSON.stringify(transactionsData, null, 2);
  const brandsJson = JSON.stringify(brandsData, null, 2);
  const storesJson = JSON.stringify(storesData, null, 2);

  // Build the prompt with a greeting and concise answer instructions.
  const query = `
  I am here to give you insights regarding your sustainable practices and how you can improve them.
  Please respond in plain text only, with no Markdown formatting or asterisks. 
  Provide a concise, direct answer unless further elaboration is requested.
  
  Below is my transaction data in JSON format:
  ${transactionsJson}
  
  Below is my brand data in JSON format:
  ${brandsJson}
  
  Below is my store data in JSON format:
  ${storesJson}
  
  Based on this data, please answer the following question in plain text (no asterisks or Markdown formatting):
  ${question}
  `;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(query);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Sorry, I had trouble connecting to the AI service. Please check your API key and internet connection.';
  }
}
