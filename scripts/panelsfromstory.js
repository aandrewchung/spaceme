const generateChatGPTResponse = require('./gptprompt.js');
const extractTextChunks = require('./extracttext.js');



async function extractPanels(story) {
  const firstPrompt = "given this story: " + story + " give me 8 key points from this story where each point will have to be 1 picture in my book. for each point, when specifiying a name, make sure to include its entity. for example sarah, the girl or whiskers, the cat. for every point. don't say anything else but 8 numbered pts. imagine ur giving 8 points of a story";
  const originalPoints = await generateChatGPTResponse(firstPrompt);
  console.log(originalPoints);
  console.log("\n")

  const secondPrompt = "Talk to me like I'm a kid. Take these 8 story points: " + originalPoints + " and rewrite each pt in a descriptive and storytelling manner, but keep the language simple and avoid overly expressive words. Imagine you are narrating a scene from a children's book. each numbered pt should b 1 sentence and less than 225 characters";
  const specificPoints = await generateChatGPTResponse(secondPrompt);
  console.log(specificPoints);
  console.log("\n")
  // console.log(typeof specificPoints);

  // You can also extract text chunks here if needed
  const chunks = extractTextChunks(originalPoints);
  console.log(chunks);

  return chunks;
}

module.exports = { extractPanels };


// const story = `
// In a sunny, peaceful suburban neighborhood filled with colorful houses and lush gardens, 
// Sarah, a kind-hearted young girl, was playing in her front yard when she suddenly realized 
// her fluffy orange kitten, Whiskers, was missing. Her heart filled with worry, she embarked 
// on a search throughout the neighborhood, calling out Whiskers' name. Her determined quest 
// led her to discover Whiskers hiding under a bush in a neighbor's garden, frightened by a loud noise. 
// With gentle coaxing, Sarah reunited with her beloved pet, and Whiskers purred happily 
// in recognition. Cradling Whiskers in her arms, Sarah comforted him with soft words 
// as they made their way back home. Together, they returned to their front yard, 
// continuing their playtime, their bond stronger than ever.
// `;
// extractPanels(story);



