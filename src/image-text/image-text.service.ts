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
      ctx.strokeStyle = "white";
      const textMeasurements = ctx.measureText(text);
      const xPos =
        textMeasurements.width > image.width
          ? 0
          : (image.width/2) - (textMeasurements.width/2);
      ctx.drawImage(image, 0, 0, image.width, image.height);
      ctx.lineWidth = 8;
      ctx.miterLimit = 3;
      ctx.strokeText(text, xPos, image.height/2, image.width);
      ctx.fillText(text, xPos, image.height/2, image.width);

      const buffer = canvas.toBuffer("image/jpeg");
      fs.writeFileSync(`./public/${fileName}`, buffer);

      return fileName;
    });
  }
}
