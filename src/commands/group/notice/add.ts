import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { NoticeService } from '../../../services/NoticeService';

const noticeAddCommand: SubCommand = {
  name: CommandName.NOTICE_SUB_ADD,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const noticeService = Container.get(NoticeService);

    await interaction.showModal(noticeService.createAddModal());
  },
};

export { noticeAddCommand };
