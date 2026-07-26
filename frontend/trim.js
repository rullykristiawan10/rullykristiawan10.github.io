import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'images', 'Gemini_Generated_Image_l8zeeml8zeeml8ze-removebg-preview.png');
const outputPath = path.join(process.cwd(), 'public', 'images', 'logo_cropped.png');

sharp(inputPath)
  .trim() // automatically trims "boring" transparent pixels
  .toFile(outputPath)
  .then(info => {
    console.log("Successfully cropped the image!");
    console.log(info);
  })
  .catch(err => {
    console.error("Error cropping image:", err);
  });
