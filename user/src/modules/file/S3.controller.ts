import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileMessage } from 'src/common/message-patterns/file-messages';
import { UploadFile } from './dto/upload-file.type';
import { S3Service } from './S3.service';

export const APP_FOLDER: string = 'Nobito';

export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  @MessagePattern(FileMessage.UPLOAD_FILE)
  async uploadFile(@Payload() { file }: UploadFile) {
    return await this.s3Service.uploadFile(file, APP_FOLDER);
  }
}
