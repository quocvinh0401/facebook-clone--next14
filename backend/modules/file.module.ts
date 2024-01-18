import { Module } from '@nestjs/common';
import { FileController } from 'controllers/file.controller';
import { CloudinaryService } from 'services/cloudinary.service';
import { FileService } from 'services/file.service';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService, CloudinaryService],
})
export class FileModule {}
