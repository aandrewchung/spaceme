import { generateImageFiles, generateImagesLinks } from "bimg";
import { convertAndSaveImage } from './convertimagedata.js';
import { extractPanels } from './panelsfromstory.js';
import { createVerticalPDF, createHorizontalPDF } from './imagetopdf.js';
import fs from 'fs';


// const imageLinks = await generateImagesLinks("draw a dog yur"); // returns an array of 4 image links
const prompt = "Anime manga-style: white hair male with blue eyes opening up the door to his room with shocked expression ";
const story = `
As the sun dipped below the horizon, casting long shadows on the soccer field, Alex could feel the weight of the game on his shoulders. With a swift dribble, he maneuvered past defenders, his heart pounding in his chest. In the final seconds of the match, he unleashed a powerful strike that sent the ball crashing into the back of the net. The stadium erupted in a deafening roar, and his teammates swarmed him, jubilant and proud. Together, they had clinched victory, their cheers echoing into the twilight, etching a memory of unity and triumph that would stay with them for a lifetime.
`;


async function main() {
    const panels = await extractPanels(story);
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
  
main();
  







