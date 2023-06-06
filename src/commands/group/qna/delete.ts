import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { QnaService } from '../../../services';
import { logger } from '../../../utils';

const qnaDeleteCommand: SubCommand = {
  name: CommandName.QNA_SUB_DELETE,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const qnaService = Container.get(QnaService);
    const id = interaction.options.getInteger(OptionId.QNA_ID, true);

    const qna = await qnaService.findOne(id);
    if (!qna) {
      await interaction.editReply({
        content: '존재하지 않는 질문입니다.',
      });
      return;
    }

    try {
      await qnaService.remove(id);
    } catch (error) {
      logger.error(error);
      await interaction.editReply({ content: '오류가 발생했습니다.' });
      return;
    }

    await interaction.editReply({
      content: `${qna.question}(\`${qna.id}\`)(을)를 삭제하였습니다.`,
    });
  },
};

export { qnaDeleteCommand };
