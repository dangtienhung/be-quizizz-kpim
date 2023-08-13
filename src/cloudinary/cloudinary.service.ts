import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'quizizz',
      format: 'png',
    } as { folder: string; format: string },
  });
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: 'dcwdrvxdg',
      api_key: '558211356134342',
      api_secret: 'udY2HfWNeQFfU0SbZ5sU6g8CN9M',
    });
  }

  async uploadFile(file: any) {
    const files = file;
    const result = await cloudinary.uploader.upload(files.path);
    return result;
  }
}
