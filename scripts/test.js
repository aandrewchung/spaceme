const { generateImageFiles, generateImagesLinks } = require("bimg");
const { convertAndSaveImage } = require('./convertimagedata.js');
const { extractPanels } = require('./panelsfromstory.js');
const { createVerticalPDF, createHorizontalPDF } = require('./imagetopdf.js');
const fs = require('fs');

async function main(story, characters) {
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
            imagePath = `images/panels/${randomImageIndex - 1}.jpeg`;
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

const characters = "Sarah is a kind-hearted young girl. Whiskers is a fluffy orange cat.";
main(story, characters);
