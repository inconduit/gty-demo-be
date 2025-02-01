import { Injectable } from '@nestjs/common';
const { createCanvas, loadImage } = require('canvas');
const fs = require("fs");

@Injectable()
export class ImageTextService {
  drawImageText(imageUrl: string, text: string): Promise<string> {
    return loadImage(imageUrl).then((image) => {
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      const fileName = `image_${new Date().getTime()}.jpg`;
      const fontSize = Math.round(image.width / 10);
      ctx.font = `${fontSize}px Impact`;
      const textMeasurements = ctx.measureText(text);

      ctx.drawImage(image, 0, 0, image.width, image.height);
      ctx.fillText(text, (image.width/2) - (textMeasurements.width/2), image.height/2);

      const buffer = canvas.toBuffer("image/jpeg");
      fs.writeFileSync(`./public/${fileName}`, buffer);

      return fileName;
    });
  }
}
