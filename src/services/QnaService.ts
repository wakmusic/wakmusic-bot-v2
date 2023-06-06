import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import Container from 'typedi';
import { QnaEntity } from '../entitys/main/qna.entity';
import {
  APIEmbedField,
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { ModalName, ModalOptionId } from '../constants';
import { CategoryService } from './CategoryService';

interface QnaDto {
  category: string;
  question: string;
  description: string;
  createAt: number;
}

@Service()
export class QnaService {
  mainDataSource: DataSource;

  constructor(private readonly categoryService: CategoryService) {
    this.mainDataSource = Container.get('mainDataSource');
  }

  async findOne(qnaId: number): Promise<QnaEntity | null> {
    return await this.mainDataSource
      .createQueryBuilder(QnaEntity, 'qna')
      .leftJoinAndSelect('qna.category', 'category')
      .where('qna.id = :id', { id: qnaId })
      .getOne();
  }

  async findAll(): Promise<Array<QnaEntity>> {
    return await this.mainDataSource
      .createQueryBuilder(QnaEntity, 'qna')
      .leftJoinAndSelect('qna.category', 'category')
      .getMany();
  }

  async add(qna: QnaEntity): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(QnaEntity, 'qna')
      .insert()
      .into(QnaEntity)
      .values(qna)
      .execute();
  }

  async update(qna: Partial<QnaEntity>): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(QnaEntity, 'qna')
      .update()
      .set(qna)
      .where('qna.id = :id', { id: qna.id })
      .execute();
  }

  async remove(qnaId: number): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(QnaEntity, 'qna')
      .delete()
      .from(QnaEntity)
      .where('qna.id = :id', { id: qnaId })
      .execute();
  }

  async create(qnaData: QnaDto): Promise<QnaEntity> {
    const qna = new QnaEntity();
    const qnaCategory = await this.categoryService.findOneByTypeAndName(
      'qna',
      qnaData.category
    );
    if (qnaCategory === null) throw new Error('failed to find qna category.');

    if (qnaData) {
      qna.category = qnaCategory;
      qna.question = qnaData.question;
      qna.description = qnaData.description;
      qna.createAt = qnaData.createAt;
    }

    return qna;
  }

  toEmbedFields(qnaList: Array<QnaEntity>): Array<APIEmbedField> {
    return qnaList.map((qna) => {
      return {
        name: `${qna.question}(\`${qna.id}\`)`,
        value: `생성 시각 : <t:${parseInt(
          qna.createAt.toString()
        )}>\n카테고리 : ${qna.category.category}\n답변 :\n\`\`\`${
          qna.description
        }\`\`\``,
        inline: false,
      };
    });
  }

  createAddModal(): ModalBuilder {
    const category = new TextInputBuilder()
      .setCustomId(ModalOptionId.QNA_CATEGORY)
      .setLabel('카테고리를 입력해주세요.')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    const question = new TextInputBuilder()
      .setCustomId(ModalOptionId.QNA_QUESTION)
      .setLabel('질문을 입력해주세요.')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);
    const answer = new TextInputBuilder()
      .setCustomId(ModalOptionId.QNA_ANSWER)
      .setLabel('답변을 입력해주세요.')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    return new ModalBuilder()
      .setCustomId(ModalName.QNA_ADD)
      .setTitle('Q&A 등록')
      .addComponents(
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          category
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          question
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          answer
        )
      );
  }

  createChangeModal(qna: QnaEntity): ModalBuilder {
    const id = new TextInputBuilder()
      .setCustomId(ModalOptionId.QNA_ID)
      .setLabel('수정할 qna id 입니다. (수정 X)')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setValue(qna.id.toString());
    const category = new TextInputBuilder()
      .setCustomId(ModalOptionId.QNA_CATEGORY)
      .setLabel('카테고리를 입력해주세요.')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setValue(qna.category.category);
    const question = new TextInputBuilder()
      .setCustomId(ModalOptionId.QNA_QUESTION)
      .setLabel('질문을 입력해주세요.')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setValue(qna.question);
    const answer = new TextInputBuilder()
      .setCustomId(ModalOptionId.QNA_ANSWER)
      .setLabel('답변을 입력해주세요.')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setValue(qna.description);

    return new ModalBuilder()
      .setCustomId(ModalName.QNA_CHANGE)
      .setTitle(`Q&A 변경 (id: ${qna.id})`)
      .addComponents(
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          id
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          category
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          question
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          answer
        )
      );
  }
}
