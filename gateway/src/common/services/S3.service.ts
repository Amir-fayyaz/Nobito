import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      region: 'default',
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS') as string,
        secretAccessKey: this.configService.get<string>('S3_SECRET') as string,
      },
      forcePathStyle: true,
    });
  }

  private readonly bucketName = this.configService.get('S3_BUCKET') as string;

  async uploadFile(file: Express.Multer.File, folder: string = '') {
    const key = folder ? `${folder}/${file.originalname}` : file.originalname;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      await this.s3Client.send(
        new PutObjectCommand(uploadParams as PutObjectCommandInput),
      );
      return {
        url: `https://${this.bucketName}.storage.c2.liara.space/${key}`,
        key,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteFile(key: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
      return { success: true, message: 'فایل با موفقیت حذف شد' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async CheckFileExists(Bucket: string, Key: string) {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket,
          Key,
        }),
      );
      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }
}
