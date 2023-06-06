import { ModalSubmitInteraction } from 'discord.js';
import { Modal } from '../../templates';
import { ModalName, ModalOptionId } from '../../constants';
import Container from 'typedi';
import { CategoryService, QnaService } from '../../services';
import { logger } from '../../utils';

const qnaChangeModal: Modal = {
  id: ModalName.QNA_CHANGE,
  execute: async (interaction: ModalSubmitInteraction): Promise<void> => {
    await interaction.deferReply();

    const qnaService = Container.get(QnaService);
    const categoryService = Container.get(CategoryService);

    const qnaId = parseInt(
      interaction.fields.getTextInputValue(ModalOptionId.QNA_ID)
    );
    const categoryName = interaction.fields.getTextInputValue(
      ModalOptionId.QNA_CATEGORY
    );
    const question = interaction.fields.getTextInputValue(
      ModalOptionId.QNA_QUESTION
    );
    const description = interaction.fields.getTextInputValue(
      ModalOptionId.QNA_ANSWER
    );

    const qna = await qnaService.findOne(qnaId);
    if (qna === null) {
      await interaction.editReply({ content: '질문을 찾지 못했습니다.' });
      return;
    }

    const category = await categoryService.findOneByTypeAndName(
      'qna',
      categoryName
    );
    if (category === null) {
      await interaction.editReply({ content: '존재하지 않는 카테고리입니다.' });
      return;
    }

    try {
      await qnaService.update({
        id: qna.id,
        category: category,
        question: question,
        description: description,
      });
    } catch (error) {
      logger.error(error);
      await interaction.editReply({ content: '에러가 발생하였습니다.' });
      return;
    }

    await interaction.editReply({
      content: `(\`${qna.id}\`)질문이 변경되었습니다.`,
    });
  },
};

export { qnaChangeModal };
