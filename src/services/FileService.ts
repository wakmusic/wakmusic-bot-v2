import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Service } from 'typedi';
import { UploadOptions } from '../templates/interfaces/UploadOption';
import { logger } from '../utils';
import axios from 'axios';
import { moment } from '../configs/moment.config';
import { createReadStream, createWriteStream, unlink } from 'fs';
import { get } from 'https';
import srtToVtt from 'srt-to-vtt';

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

  async uploadManyImage(
    path: string,
    urls: Array<string>
  ): Promise<Array<string | null>> {
    const results = [];
    const currentTime = moment().valueOf();
    let idx = 0;
    for (const url of urls) {
      const arrayData = await this.downloadFromURL(url);

      idx += 1;
      results.push(
        await this.uploadImage({
          data: arrayData,
          path: path,
          fileName: `${currentTime}_${idx}`,
          fileType: 'png',
        })
      );
    }
    return results;
  }

  async uploadLyrics(songId: string): Promise<string | null> {
    try {
      const lyrics = createReadStream(
        process.env.LYRICS_PATH + `/${songId}.vtt`
      );
      await this.r2Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: `static/lyrics/${songId}.vtt`,
          Body: lyrics,
          ContentType: 'text/vtt',
        })
      );

      return `${process.env.R2_BASE_URL}/static/lyrics/${songId}.vtt`;
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

  downloadLyrics(url: string, songId: string): Promise<string> {
    const parsedURL = new URL(url);
    const fileType = parsedURL.pathname.split('.').pop();
    const file = createWriteStream(
      process.env.LYRICS_PATH + `/${songId}.${fileType ?? 'srt'}`
    );
    return new Promise((resolve, reject) => {
      const request = get(url, (response) => {
        console.log(response.statusCode);
        response.pipe(file);
      });

      file.on('finish', () => {
        file.close((error) => {
          if (error) reject(error);
          else resolve(`${songId}.${fileType ?? 'srt'}`);
        });
      });

      request.on('error', (error) => {
        reject(error);
      });
    });
  }

  convertSrtToVtt(songId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = createReadStream(`${process.env.LYRICS_PATH}/${songId}.srt`)
        .pipe(srtToVtt())
        .pipe(createWriteStream(`${process.env.LYRICS_PATH}/${songId}.vtt`));

      file.on('finish', () => {
        file.close((error) => {
          if (error) return reject(error);
          return resolve(`${songId}.vtt`);
        });
      });
    });
  }

  createFileName(name: string, version?: number): string {
    if (version === undefined) {
      return name;
    }

    return name + '-' + version.toString();
  }
}
