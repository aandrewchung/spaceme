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
            prompt: prompt,
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

const prompt = 'Anime manga-style: white hair male with blue eyes opening up the door to his room with shocked expression';

generateDALLE2Image(prompt);
