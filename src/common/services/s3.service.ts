import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config();
const { S3_SECRET, S3_ACCESS, S3_BUCKET, S3_ENDPOINT } = process.env;

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName = S3_BUCKET;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: S3_ENDPOINT as string,
      region: 'default',
      credentials: {
        accessKeyId: S3_ACCESS as string,
        secretAccessKey: S3_SECRET as string,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'nobito') {
    const ext = file.originalname.split('.').pop();
    const uniqueName = `${uuidv4()}.${ext}`;
    const key = folder ? `${folder}/${uniqueName}` : uniqueName;

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
      console.error('Upload Error:', error.message);
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
      console.error('Upload Error:', error.message);
      return error.message;
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
      console.error('Upload Error:', error.message);
      return error.message;
    }
  }
}
