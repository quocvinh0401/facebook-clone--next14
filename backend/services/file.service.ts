import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { Service } from './supports/service';

@Injectable()
export class FileService extends Service {
  constructor(private readonly cloudinaryService: CloudinaryService) {
    super();
  }

  async upload(files: Array<Express.Multer.File>): Promise<string[]> {
    try {
      const imagePromises = files.map((file) =>
        this.cloudinaryService.uploadFile(file),
      );
      const imageResponses = await Promise.all(imagePromises);

      return imageResponses.map((image) => image.url);
    } catch (error) {
      this.logger.error('upload image error:::::', error);
      throw new BadRequestException('Upload unsuccessfully');
    }
  }
}
