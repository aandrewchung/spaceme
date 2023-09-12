const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const fetch = require('node-fetch'); // Require the 'node-fetch' module

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'; // Adjust the engine and endpoint as needed

async function generateChatGPTResponse(prompt) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  const requestBody = {
    prompt: prompt,
    max_tokens: 50, // Adjust as needed for the desired response length
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${data.error.message}`);
    }

    const chatGPTResponse = data.choices[0].text;

    console.log('ChatGPT Response:', chatGPTResponse);
    return chatGPTResponse;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

module.exports = generateChatGPTResponse; // Export the function

// Example usage
// const prompt = 'Generate a 50 story about a dragon and a knight';

// generateChatGPTResponse(prompt)
//   .then(response => {
//     // Handle the ChatGPT response here
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
