import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { QnaService } from '../../../services';
import { logger } from '../../../utils';

const qnaListCommand: SubCommand = {
  name: CommandName.QNA_SUB_LIST,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const qnaService = Container.get(QnaService);
    const qnaList = await qnaService.findAll();

    const embedFields = qnaService.toEmbedFields(qnaList);

    const embed = new EmbedBuilder()
      .setTitle('질문 목록')
      .addFields(embedFields);

    await interaction.editReply({ embeds: [embed] });
  },
};

export { qnaListCommand };
