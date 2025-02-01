import { Controller, Post, Header, Body } from '@nestjs/common';
import { CreateImageTextDto } from './image-text-dto';
import { ImageTextService } from './image-text.service';

@Controller('image-text')
export class ImageTextController {
  constructor(private readonly imageTextService: ImageTextService) {}
  @Post()
  @Header('Content-type', 'application/json')
  async create(@Body() createImageText: CreateImageTextDto) {
    const imageUrl = await this.imageTextService.drawImageText(createImageText.imageUrl, createImageText.text)
    return JSON.stringify(({ imageUrl }));
  }
}
