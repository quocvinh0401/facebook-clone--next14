import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'services/file.service';

@Controller(['files', 'file'])
@UseGuards()
export class FileController {
  constructor(private readonly service: FileService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.service.upload(files);
  }
}
