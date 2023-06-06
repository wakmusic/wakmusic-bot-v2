import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';
import { CategoryEntity } from '../entitys/main/category.entity';
import { APIEmbed } from 'discord.js';

@Service()
export class CategoryService {
  constructor(
    @Inject('mainDataSource')
    private readonly mainDataSource: DataSource
  ) {}

  async findOneByTypeAndName(
    type: string,
    name: string
  ): Promise<CategoryEntity | null> {
    return await this.mainDataSource
      .createQueryBuilder(CategoryEntity, 'category')
      .where('category.type = :type', { type: type })
      .andWhere('category.category = :category', { category: name })
      .getOne();
  }

  async findByType(type: string): Promise<Array<CategoryEntity>> {
    return await this.mainDataSource
      .createQueryBuilder(CategoryEntity, 'category')
      .where('category.type = :type', { type: type })
      .getMany();
  }

  async add(category: Partial<CategoryEntity>): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(CategoryEntity, 'category')
      .insert()
      .values([category])
      .execute();
  }

  async remove(id: number): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(CategoryEntity, 'category')
      .delete()
      .where('category.id = :id', { id: id })
      .execute();
  }

  createEmbed(type: string, categories: Array<CategoryEntity>): APIEmbed {
    const categoriesString = categories
      .map((category) => category.category)
      .join(', ');

    return {
      title: `${type} 카테고리 목록`,
      fields: [
        {
          name: '카테고리',
          value: categoriesString,
        },
      ],
    };
  }
}
