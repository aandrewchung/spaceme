const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib');

// Function to load an image from a file
async function loadImage(imagePath) {
  const imageBytes = await fs.readFile(imagePath);
  return imageBytes;
}

// Function to create a PDF with images in a grid layout on a single page
async function createPdfWithImages(imagePaths, outputPath) {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 500; // Square page dimensions
  const pageHeight = 800;
  const imageWidth = (pageHeight / 5) * 0.9; // Scale down to 90%
  const imageHeight = (pageHeight / 5) * 0.9; // Scale down to 90%
  const horizontalGap = (pageWidth - (2* imageWidth) )/ 3; // Horizontal gap between images
  const verticalGap = (pageHeight - (4* imageHeight) )/ 5; // Horizontal gap between images

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const imageBytes = await loadImage(imagePath);
    const image = await pdfDoc.embedJpg(imageBytes);

    // Calculate x and y coordinates based on the grid layout with gaps
    const row = Math.floor(i / 2); // Two images per row
    const col = i % 2; // Two columns

    const x = col * (imageWidth + horizontalGap) + horizontalGap; // Add horizontal gap between images
    const y = pageHeight - (row + 1) * (imageHeight + verticalGap); // Start from the top, add vertical gap between rows


    page.drawImage(image, {
      x,
      y,
      width: imageWidth,
      height: imageHeight,
    });
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Write the PDF to a file
  await fs.writeFile(outputPath, pdfBytes);
}

const imagePaths = [];
for (let i = 0; i < 8; i++) {
  imagePaths.push(`images/${i}.jpeg`);
}

const outputPath = 'output.pdf';

createPdfWithImages(imagePaths, outputPath)
  .then(() => console.log('PDF created successfully'))
  .catch((err) => console.error('Error creating PDF:', err));
