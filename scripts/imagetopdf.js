const fs = require('fs').promises;
const { PDFDocument , rgb} = require('pdf-lib');

// Function to load an image from a file
async function loadImage(imagePath) {
  const imageBytes = await fs.readFile(imagePath);
  return imageBytes;
}

// Function to create a PDF with images in a grid layout on a single page
async function createVerticalPDF(imagePaths, outputPath) {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 250; // Square page dimensions
  const pageHeight = 500;
  const imageWidth = (pageHeight / 5) * 1.05; // Scale down to 90%
  const imageHeight = (pageHeight / 5) * 1.05; // Scale down to 90%
  const borderSize = 2; // Size of the black border
  const horizontalGap = (pageWidth - (2 * imageWidth)) / 3; // Horizontal gap between images
  const verticalGap = (pageHeight - (4 * imageHeight)) / 5 * 0.5; // Vertical gap between images
  // const verticalTopTitle = 30;
  const verticalTopTitle = pageHeight - (4 * (imageHeight + 2 *borderSize) + 3*verticalGap) - horizontalGap;

  // console.log(verticalTopTitle);
  // console.log(horizontalGap, verticalGap);
  // console.log(imageWidth)

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const imageBytes = await loadImage(imagePath);
    const image = await pdfDoc.embedJpg(imageBytes);

    // Calculate x and y coordinates based on the grid layout with gaps
    const row = Math.floor(i /2); // Two images per row
    const col = i % 2; // Two columns

    const x = col * (imageWidth + verticalGap) + horizontalGap + 1.5*borderSize; // Add horizontal gap between images
    const y = pageHeight - (row + 1) * (imageHeight + verticalGap) - verticalTopTitle - 2 *verticalGap + (horizontalGap - verticalGap) + borderSize; // Start from the top, add vertical gap between rows

    page.drawRectangle({
      x: x - 0.5 * borderSize,
      y: y - 0.5 * borderSize,
      width: imageWidth + 1 * borderSize,
      height: imageHeight + 1 * borderSize,
      borderWidth: borderSize, // Border width
      borderColor: rgb(0, 0, 0), // Black border color
      color: rgb(1, 1, 1), // Fill color (white)
      opacity: 1, // Opacity of the fill color
      borderOpacity: 1, // Opacity of the border
    });

    // Draw the image inside the border
    page.drawImage(image, {
      x: x,
      y: y,
      width: imageWidth,
      height: imageHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();


  // Write the PDF to a file
  await fs.writeFile(outputPath, pdfBytes);
}

async function createHorizontalPDF(imagePaths, outputPath) {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 500; // Square page dimensions
  const pageHeight = 250;
  const imageWidth = (pageWidth / 5) * 1.05; // Scale down to 90%
  const imageHeight = (pageWidth / 5) * 1.05; // Scale down to 90%
  const borderSize = 2; // Size of the black border
  const horizontalGap = (pageWidth - (4 * imageWidth)) / 5 * 0.5; // Horizontal gap between images
  const verticalGap = (pageHeight - (2 * imageHeight)) / 3; // Vertical gap between images
  const horizontalLeftTitle = pageWidth - (4 * (imageWidth + 2 * borderSize) + 3 * horizontalGap) - verticalGap;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const imageBytes = await loadImage(imagePath);
    const image = await pdfDoc.embedJpg(imageBytes);
    let row = 0;
    let col = 0;
    // Calculate x and y coordinates based on the grid layout with gaps
    if (i < 4) {
      row = 1;
      col = i;
    } else {
      row = 0;
      col = i - 4;
    }
    // const row = ~(i % 2) + 2; // Two images per row
    // const col = Math.floor(i / 2); // Two columns
    // console.log(row, col);

    const calc = pageWidth - (3*(imageWidth + 4*borderSize) + horizontalLeftTitle + 2*borderSize + imageWidth) - verticalGap
    const x = col * (imageWidth + horizontalGap) + horizontalLeftTitle + borderSize +  calc; // Add horizontal gap between images
    const y = row * (imageHeight + horizontalGap) + verticalGap - (horizontalGap - verticalGap) / 2; // Start from the top, add vertical gap between rows
    // console.log(x, y);

    
    // Draw a black border around the image
    page.drawRectangle({
      x: x - 0.5 * borderSize,
      y: y - 0.5 * borderSize,
      width: imageWidth + 1 * borderSize,
      height: imageHeight + 1 * borderSize,
      borderWidth: borderSize, // Border width
      borderColor: rgb(0, 0, 0), // Black border color
      color: rgb(1, 1, 1), // Fill color (white)
      opacity: 1, // Opacity of the fill color
      borderOpacity: 1, // Opacity of the border
    });

    // Draw the image inside the border
    page.drawImage(image, {
      x: x,
      y: y,
      width: imageWidth,
      height: imageHeight,
    });

  }

  const pdfBytes = await pdfDoc.save();

  // Write the PDF to a file
  await fs.writeFile(outputPath, pdfBytes);
}

module.exports = { createVerticalPDF , createHorizontalPDF };

const imagePaths = [];
for (let i = 0; i < 8; i++) {
  imagePaths.push(`images/${i}.jpeg`);
}

const verticalPath = 'pdfs/output0.pdf';
const horizontalPath = 'pdfs/output1.pdf';

createVerticalPDF(imagePaths, verticalPath)
  .then(() => console.log('Vertical PDF created successfully'))
  .catch((err) => console.error('Error creating PDF:', err));

createHorizontalPDF(imagePaths, horizontalPath)
  .then(() => console.log('Horizontal PDF created successfully'))
  .catch((err) => console.error('Error creating PDF:', err));
