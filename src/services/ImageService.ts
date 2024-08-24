import { Inject, Service } from 'typedi';
import { DataSource, QueryRunner } from 'typeorm';
import { ImageEntity } from '../entitys/new/image.entity';
import moment from 'moment';
import { ImageVersionEntity } from '../entitys/new/image-version.entity';

@Service()
export class ImageService {
  constructor(
    @Inject('DataSource')
    private readonly datasource: DataSource
  ) {}

  async create(options: {
    type: string;
    name: string;
    path: string;
    qr?: QueryRunner;
  }): Promise<number> {
    let imageId: number | null = null;
    const now = moment().valueOf();

    const qr = options.qr ?? this.datasource.createQueryRunner();
    if (options.qr == null) {
      await qr.connect();
      await qr.startTransaction();
    }

    try {
      const imageResult = await qr.manager.insert(ImageEntity, {
        type: options.type,
        name: options.name,
        createdAt: now,
        updatedAt: now,
      });

      imageId = imageResult.identifiers[0].id;

      const imageVersionResult = await qr.manager.insert(ImageVersionEntity, {
        imageId,
        url: options.path,
        createdAt: now,
      });

      const imageVersionId: number = imageVersionResult.identifiers[0].id;

      await qr.manager.update(
        ImageEntity,
        {
          id: imageId,
        },
        {
          currentVersionId: imageVersionId,
        }
      );

      if (options.qr == null) await qr.commitTransaction();
    } catch (error) {
      if (options.qr == null) await qr.rollbackTransaction();

      throw error;
    } finally {
      if (options.qr == null) await qr.release();
    }

    return imageId;
  }

  async update(options: {
    imageId: ImageEntity['id'];
    path: string;
    qr?: QueryRunner;
  }): Promise<void> {
    const now = moment().valueOf();

    const qr = options.qr ?? this.datasource.createQueryRunner();
    if (options.qr == null) {
      await qr.connect();
      await qr.startTransaction();
    }

    try {
      const imageVersionResult = await qr.manager.insert(ImageVersionEntity, {
        imageId: options.imageId,
        url: options.path,
        createdAt: now,
      });

      const imageVersionId: number = imageVersionResult.identifiers[0].id;

      await qr.manager.update(
        ImageEntity,
        {
          id: options.imageId,
        },
        {
          currentVersionId: imageVersionId,
          updatedAt: now,
        }
      );

      if (options.qr == null) await qr.commitTransaction();
    } catch (error) {
      if (options.qr == null) await qr.rollbackTransaction();

      throw error;
    } finally {
      if (options.qr == null) await qr.release();
    }
  }
}
