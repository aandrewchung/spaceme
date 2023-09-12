import { generateImageFiles, generateImagesLinks } from "bimg";
import { convertAndSaveImage } from './convert.js';

// const imageLinks = await generateImagesLinks("draw a dog yur"); // returns an array of 4 image links
const prompt = "Anime manga-style: white hair male with blue eyes opening up the door to his room with shocked expression ";

// Remove special characters and replace with spaces
const cleanPrompt = prompt.replace(/[^\w\s]/g, ' ');

const imageFiles = await generateImageFiles(cleanPrompt); // returns an array of 4 image files

// // console.log(imageFiles);

// Loop through the image files and convert/save each one
for (const imageFile of imageFiles) {
    convertAndSaveImage(imageFile);
}


