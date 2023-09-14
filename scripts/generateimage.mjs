import { generateImageFiles, generateImagesLinks } from "bimg";
import { convertAndSaveImage } from './convertimagedata.js';
import { extractPanels } from './panelsfromstory.js';
import { createPdfWithImages } from './imagetopdf.js';
import fs from 'fs';


// const imageLinks = await generateImagesLinks("draw a dog yur"); // returns an array of 4 image links
const prompt = "Anime manga-style: white hair male with blue eyes opening up the door to his room with shocked expression ";
const story = `
In a sunny, peaceful suburban neighborhood filled with colorful houses and lush gardens, 
Sarah, a kind-hearted young girl, was playing in her front yard when she suddenly realized 
her fluffy orange cat, Whiskers, was missing. Her heart filled with  worry, she embarked 
on a search throughout the neighborhood, yelling Whiskers' name. Her determined quest 
led her to find her cat hiding in the trees in a neighbor's garden, frightened by a loud noise. 
With gentle coaxing, Sarah reunited with her beloved pet, and her cat purred happily 
in recognition. Cradling her cat in her arms, Sarah comforted him with soft words 
as they made their way back home. Together, they returned to their front yard, 
continuing their playtime, their bond stronger than ever.
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

        const imageFiles = await generateImageFiles(cleanPrompt); // returns an array of 4 image files

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
        let imagePath = `images/${randomImageIndex}.jpeg`;

        while (!fs.existsSync(imagePath)) {
            imagePath = `images/${randomImageIndex-1}.jpeg`;
        }

      imagePaths.push(imagePath);
    }

    const outputPath = 'output.pdf';

    console.log(imagePaths);

    createPdfWithImages(imagePaths, outputPath)
    .then(() => console.log('PDF created successfully'))
    .catch((err) => console.error('Error creating PDF:', err));

  }
  


  // Remove special characters and replace with spaces
    // const cleanPrompt = prompt.replace(/[^\w\s]/g, ' ');

    // const imageFiles = await generateImageFiles(cleanPrompt); // returns an array of 4 image files

    // // Loop through the image files and convert/save each one

    // for (const imageFile of imageFiles) {
    //     convertAndSaveImage(imageFile, count);
    //     count++;
    // }
  main();
  







