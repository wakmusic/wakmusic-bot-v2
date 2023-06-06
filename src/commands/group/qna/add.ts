import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { QnaService } from '../../../services';

const qnaAddCommand: SubCommand = {
  name: CommandName.QNA_SUB_ADD,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const qnaService = Container.get(QnaService);

    await interaction.showModal(qnaService.createAddModal());
  },
};

export { qnaAddCommand };
