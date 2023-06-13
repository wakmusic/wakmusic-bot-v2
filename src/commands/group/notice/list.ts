import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { NoticeService } from '../../../services/NoticeService';

const noticeListCommand: SubCommand = {
  name: CommandName.NOTICE_SUB_LIST,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const noticeService = Container.get(NoticeService);

    const noticeList = await noticeService.findAll();

    const embed = new EmbedBuilder()
      .setTitle('공지 목록')
      .addFields(noticeService.toEmbedFields(noticeList));

    await interaction.editReply({ embeds: [embed] });
  },
};

export { noticeListCommand };
