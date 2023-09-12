import { generateImageFiles, generateImagesLinks } from "bimg";

const imageLinks = await generateImagesLinks("draw a dog yur"); // returns an array of 4 image links
console.log(imageLinks);