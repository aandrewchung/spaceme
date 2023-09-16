import { generateImageFiles, generateImagesLinks } from "bimg";
import { convertAndSaveImage } from './convertimagedata.js';
import { extractPanels } from './panelsfromstory.js';
import { createVerticalPDF, createHorizontalPDF } from './imagetopdf.js';
import fs from 'fs';


export async function main(story, characters) {
    const temp = await extractPanels(story, characters);
    const panels = temp[0];
    const quotes = temp[1];
    let count = 0;

    // Loop through each panel and create a separate prompt for each
    for (let i = 0; i < panels.length; i++) {
        const panelContent = panels[i]; // Assuming each panel's content is stored in an array
        const prompt = `Anime manga-style: ${panelContent}`;

        // Use 'prompt' for further processing (e.g., sending it to the AI model)
        console.log(prompt);


        // Remove special characters and replace with spaces
        const cleanPrompt = prompt.replace(/[^\w\s]/g, ' ');

        let imageFiles;

        while (!imageFiles) {
            try {
                imageFiles = await generateImageFiles(cleanPrompt); // Try to generate image files
            } catch (error) {
                console.error("Error generating image files:", error);
                // Optionally, you can introduce a delay before trying again to avoid spamming the function
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
            }
        }
        // Loop through the image files and convert/save each one

        for (const imageFile of imageFiles) {
            convertAndSaveImage(imageFile, count);
            count++;
        }

    }

    
    const imagePaths = [];
    for (let group = 0; group < 8; group++) {
        const startIndex = group * 4;
        const randomIndex = Math.floor(Math.random() * 4); // Generate a random index from 0 to 3 within each group
        const randomImageIndex = startIndex + randomIndex;
        let imagePath = `images/panels/${randomImageIndex}.jpeg`;

        while (!fs.existsSync(imagePath)) {
            imagePath = `images/panels/${randomImageIndex-1}.jpeg`;
        }

      imagePaths.push(imagePath);
    }

    console.log(imagePaths);

    const verticalPath = 'pdfs/output0.pdf';
    const horizontalPath = 'pdfs/output1.pdf';
    
    createVerticalPDF(imagePaths, verticalPath)
      .then(() => console.log('Vertical PDF created successfully'))
      .catch((err) => console.error('Error creating PDF:', err));
    
    createHorizontalPDF(imagePaths, horizontalPath)
      .then(() => console.log('Horizontal PDF created successfully'))
      .catch((err) => console.error('Error creating PDF:', err));
}
  


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

const characters = "Sarah is a kind hearted young girl. Whiskers is a fluffy orange cat.";

const story3 = "In the bustling heart of the city, Hugo, Andrew, and Aleks gathered in a cozy co-working space, laptops open and determination in their eyes. They were a trio of tech-savvy friends, united by their passion for coding and innovation. It was the day of the annual citywide hackathon, and they were ready to make their mark. Hugo, with his unruly hair and a knack for creative problem-solving, took charge as the team's visionary. Andrew, the meticulous programmer, brought precision to their ideas, ensuring every line of code was flawless. Aleks, the team's communication wizard, transformed their technical concepts into compelling pitches. Together, they embarked on a 24-hour coding spree, fueled by caffeine and camaraderie. As the hackathon unfolded, their screens filled with lines of code, and their brainstorming sessions ignited with creative sparks. They encountered challenges and setbacks but persevered with unwavering determination. When the clock finally struck zero, they emerged as a formidable team, their project a testament to their friendship and their shared love for hacking innovation."

const chars3 = "Hugo is a tall guy with dark longish curly hair and brown eyes, andrew is a guy with short black hair and brown eyes, and aleks is a girl with a brown bob and blue eyes"

main(story3, chars3);
