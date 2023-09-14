const fs = require('fs').promises;
const { PDFDocument , rgb} = require('pdf-lib');

// Function to load an image from a file
async function loadImage(imagePath) {
  const imageBytes = await fs.readFile(imagePath);
  return imageBytes;
}

// Function to create a PDF with images in a grid layout on a single page
async function createPdfWithImages(imagePaths, outputPath) {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 250; // Square page dimensions
  const pageHeight = 500;
  const imageWidth = (pageHeight / 5) * 1.1; // Scale down to 90%
  const imageHeight = (pageHeight / 5) * 1.1; // Scale down to 90%
  const borderSize = 2; // Size of the black border
  const horizontalGap = (pageWidth - (2 * imageWidth)) / 3; // Horizontal gap between images
  const verticalGap = (pageHeight - (4 * imageHeight)) / 5 * 0.5; // Vertical gap between images
  // const verticalTopTitle = 30;
  const verticalTopTitle = pageHeight - (4 * (imageHeight + 2 *borderSize) + 3*verticalGap) - horizontalGap;
  console.log(verticalTopTitle);

  console.log(horizontalGap, verticalGap);
  console.log(imageWidth)

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    const imageBytes = await loadImage(imagePath);
    const image = await pdfDoc.embedJpg(imageBytes);

    // Calculate x and y coordinates based on the grid layout with gaps
    const row = Math.floor(i / 2); // Two images per row
    const col = i % 2; // Two columns

    const x = col * (imageWidth + horizontalGap) + horizontalGap; // Add horizontal gap between images
    const y = pageHeight - (row + 1) * (imageHeight + verticalGap) - verticalTopTitle - 2 *verticalGap; // Start from the top, add vertical gap between rows

    // Draw a black border around the image
    // page.drawRectangle({x - borderSize, y - borderSize, imageWidth + 2 * borderSize, imageHeight + 2 * borderSize, 
    //   color: rgb(0, 0, 0), // Black color
    // });

    page.drawRectangle({
      x: x + 0.5 * borderSize - borderSize,
      y: y + 0.5 * borderSize - borderSize,
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
      x: x + borderSize - borderSize,
      y: y + borderSize - borderSize,
      width: imageWidth,
      height: imageHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();


  // Write the PDF to a file
  await fs.writeFile(outputPath, pdfBytes);
}

module.exports = { createPdfWithImages };

const imagePaths = [];
for (let i = 0; i < 8; i++) {
  imagePaths.push(`images/${i}.jpeg`);
}

const outputPath = 'output.pdf';

createPdfWithImages(imagePaths, outputPath)
  .then(() => console.log('PDF created successfully'))
  .catch((err) => console.error('Error creating PDF:', err));
