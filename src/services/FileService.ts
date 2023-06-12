import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Service } from 'typedi';
import { UploadOptions } from '../templates/interfaces/UploadOption';
import { logger } from '../utils';
import axios from 'axios';

@Service()
export class FileService {
  private readonly r2Client: S3Client;

  constructor() {
    this.r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_CLIENT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async uploadImage(options: UploadOptions): Promise<string | null> {
    try {
      const fileName = this.createFileName(options.fileName, options.version);
      await this.r2Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: `${options.path}/${fileName}.${options.fileType}`,
          Body: options.data,
          ContentType: `image/${options.fileType}`,
        })
      );
      return (
        `${process.env.R2_BASE_URL}/${options.path}/${options.fileName}.${options.fileType}` +
        (options.version ? `?v=${options.version!.toString()}` : '')
      );
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async downloadFromURL(url: string): Promise<Uint8Array> {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return new Uint8Array(res.data);
  }

  createFileName(name: string, version?: number): string {
    if (version === undefined) {
      return name;
    }

    return name + '-' + version.toString();
  }
}
