import { ModalSubmitInteraction } from 'discord.js';
import { Modal } from '../../templates';
import { ModalName, ModalOptionId } from '../../constants';
import Container from 'typedi';
import { QnaService } from '../../services';
import { logger } from '../../utils';
import { moment } from '../../configs/moment.config';

const qnaAddModal: Modal = {
  id: ModalName.QNA_ADD,
  execute: async (interaction: ModalSubmitInteraction): Promise<void> => {
    await interaction.deferReply();

    const qnaService = Container.get(QnaService);

    const category = interaction.fields.getTextInputValue(
      ModalOptionId.QNA_CATEGORY
    );
    const question = interaction.fields.getTextInputValue(
      ModalOptionId.QNA_QUESTION
    );
    const description = interaction.fields.getTextInputValue(
      ModalOptionId.QNA_ANSWER
    );
    const createAt = parseInt((moment.now() / 1000).toString());

    const qna = await qnaService.create({
      category,
      question,
      description,
      createAt,
    });
    try {
      await qnaService.add(qna);
    } catch (error) {
      logger.error(error);
      await interaction.editReply({ content: '에러가 발생하였습니다.' });
      return;
    }

    await interaction.editReply({
      content: `${qna.question}(\`${qna.id}\`)질문이 추가되었습니다.`,
    });
  },
};

export { qnaAddModal };
