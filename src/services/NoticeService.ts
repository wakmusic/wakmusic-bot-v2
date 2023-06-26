import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';
import { NoticeEntity } from '../entitys/main/notice.entity';
import {
  APIEmbedField,
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { ModalName, ModalOptionId } from '../constants';

@Service()
export class NoticeService {
  constructor(
    @Inject('mainDataSource')
    private readonly mainDataSource: DataSource
  ) {}

  async findAll(): Promise<Array<NoticeEntity>> {
    return await this.mainDataSource
      .createQueryBuilder()
      .select('notice')
      .from(NoticeEntity, 'notice')
      .orderBy('notice.createAt', 'ASC')
      .getMany();
  }

  async fineOne(id: number): Promise<NoticeEntity | null> {
    return this.mainDataSource
      .createQueryBuilder()
      .select('notice')
      .from(NoticeEntity, 'notice')
      .where('notice.id = :id', { id })
      .getOne();
  }

  async add(entity: Partial<NoticeEntity>): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder()
      .insert()
      .into(NoticeEntity)
      .values(entity)
      .execute();
  }

  async update(id: number, entity: Partial<NoticeEntity>): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder()
      .update(NoticeEntity)
      .set(entity)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder()
      .delete()
      .from(NoticeEntity, 'notice')
      .where('notice.id = :id', { id })
      .execute();
  }

  toEmbedFields(noticeList: Array<NoticeEntity>): Array<APIEmbedField> {
    return noticeList.map((notice) => {
      return {
        name: `${notice.title}(\`${notice.id}\`)`,
        value: `생성 시간 : <t:${this.toEpochTime(
          notice.createAt
        )}>\n노출 시작 시간: <t:${this.toEpochTime(
          notice.startAt
        )}>\n노출 종료 시간: <t:${this.toEpochTime(notice.endAt)}>`,
        inline: false,
      };
    });
  }

  toEpochTime(time: number): number {
    return parseInt((time / 1000).toString());
  }

  createAddModal(): ModalBuilder {
    const category = new TextInputBuilder({
      customId: ModalOptionId.NOTICE_CATEGORY,
      style: TextInputStyle.Short,
      label: '카테고리',
      placeholder: '카테고리를 입력해 주세요.',
      required: true,
    });
    const title = new TextInputBuilder({
      customId: ModalOptionId.NOTICE_TITLE,
      style: TextInputStyle.Short,
      label: '제목',
      placeholder: '제목을 입력해 주세요.',
      required: true,
    });
    const mainText = new TextInputBuilder({
      customId: ModalOptionId.NOTICE_MAIN_TEXT,
      style: TextInputStyle.Paragraph,
      label: '본문',
      placeholder: '본문을 입력해 주세요.',
      required: false,
    });
    const images = new TextInputBuilder({
      customId: ModalOptionId.NOTICE_IMAGES,
      style: TextInputStyle.Paragraph,
      label: '이미지 URL',
      placeholder:
        '이미지 URL을 입력해 주세요.(첫번째 이미지는 썸네이롤 등록, 줄바꿈으로 여러 이미지 등록)',
      required: true,
    });
    const startAt = new TextInputBuilder({
      customId: ModalOptionId.NOTICE_START_DATE,
      style: TextInputStyle.Short,
      label: '시작 날짜',
      placeholder: '시작 날짜를 적어주세요 (ex: 2023-04-05)',
      required: true,
    });

    return new ModalBuilder()
      .setCustomId(ModalName.NOTICE_ADD)
      .setTitle('공지 등록')
      .addComponents(
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          category
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          title
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          mainText
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          images
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          startAt
        )
      );
  }
}
