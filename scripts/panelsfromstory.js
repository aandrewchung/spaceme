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

const generateChatGPTResponse = require('./gptprompt.js'); // Update the path to your file

// Example usage
const prompt = 'Write a 50 word story about a girl walking her cat';

generateChatGPTResponse(prompt)
  .then(response => {
    // Handle the ChatGPT response here
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
