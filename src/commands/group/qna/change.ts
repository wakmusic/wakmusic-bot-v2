import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import { logger } from '../../../utils';
import Container from 'typedi';
import { QnaService } from '../../../services';

const qnaChangeCommand: SubCommand = {
  name: CommandName.QNA_SUB_CHANGE,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const qnaService = Container.get(QnaService);

    const qnaId = interaction.options.getInteger(OptionId.QNA_ID, true);
    const qna = await qnaService.findOne(qnaId);
    if (qna === null) {
      await interaction.reply({ content: '없는 질문 id 입니다.' });
      return;
    }

    await interaction.showModal(qnaService.createChangeModal(qna));
  },
};

export { qnaChangeCommand };
