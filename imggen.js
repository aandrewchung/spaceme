import { config } from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env file
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateDALLE2Image(prompt) {
    try {
        const response = await openai.images.generate({
            prompt: "a white siamese cat",
            n: 1,
            size: "512x512",
          });

        const image_url = response.data[0].url;
          
        console.log('Generated Image URL:', image_url);
        return image_url;
    } catch (error) {
        console.error('Error generating image:', error);
    }
}

const prompt = 'Generate an image of a cute cat in space.';

generateDALLE2Image(prompt);
