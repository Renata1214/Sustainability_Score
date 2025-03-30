import Constants from 'expo-constants';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function getGeminiResponse(query: string): Promise<string> {
  // const apiKey = Constants.expoConfig?.extra?.geminiApiKey
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Missing Gemini API Key');
    return 'Missing API key. Please add EXPO_PUBLIC_GEMINI_API_KEY to your environment.';
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(query);
    const response = await result.response;

    return response.text();
  } catch (error) {
    // console.log(Constants.expoConfig?.config?.EXPO_PUBLIC_GEMINI_API_KEY)
    console.log(process.env.EXPO_PUBLIC_GEMINI_API_KEY)
    console.error('Gemini API error:', error);
    return 'Sorry, I had trouble connecting to the AI service. Please check your API key and internet connection.';
  }
}
