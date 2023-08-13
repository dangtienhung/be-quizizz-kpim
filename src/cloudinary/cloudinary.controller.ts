import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cloudinary')
@Controller('api/cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    const result = await this.cloudinaryService.uploadFile(file);
    console.log(
      '🚀 ~ file: cloudinary.controller.ts:20 ~ CloudinaryController ~ uploadFile ~ result:',
      result,
    );
    return { url: result.secure_url, public_id: result.public_id };
  }
}
