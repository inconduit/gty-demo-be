import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from './app.service';
import { ImageTextController } from './image-text/image-text.controller';
import { ImageTextService } from './image-text/image-text.service';

@Module({
  imports: [    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),],
  controllers: [AppController, ImageTextController],
  providers: [AppService, ImageTextService],
})
export class AppModule {}
