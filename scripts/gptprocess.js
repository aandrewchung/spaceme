const story = `
In a sunny, peaceful suburban neighborhood filled with colorful houses and lush gardens, 
Sarah, a kind-hearted young girl, was playing in her front yard when she suddenly realized 
her fluffy orange kitten, Whiskers, was missing. Her heart filled with worry, she embarked 
on a search throughout the neighborhood, calling out Whiskers' name. Her determined quest 
led her to discover Whiskers hiding under a bush in a neighbor's garden, frightened by a loud noise. 
With gentle coaxing, Sarah reunited with her beloved pet, and Whiskers purred happily 
in recognition. Cradling Whiskers in her arms, Sarah comforted him with soft words 
as they made their way back home. Together, they returned to their front yard, 
continuing their playtime, their bond stronger than ever.
`;

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

// Example usage
const prompt = 'Generate a 50 story about a dragon and a knight';
generateChatGPTResponse(prompt)
  .then(response => {
    // Handle the ChatGPT response here
  })
  .catch(error => {
    console.error('Error:', error);
  });
