import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { CommandName, ModalName, ModalOptionId } from '../../constants';
import { SlashCommand } from '../../templates';

export const remindCommand: SlashCommand = {
  name: CommandName.REMIND,
  description: '리마인드 명령어입니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.REMIND)
    .setDescription('리마인드 명령어입니다.')
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const name = new TextInputBuilder()
      .setCustomId(ModalOptionId.REMIND_NAME)
      .setLabel('리마인드 제목')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const body = new TextInputBuilder()
      .setCustomId(ModalOptionId.PLAYLIST_NAME)
      .setLabel('리마인드 내용')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const modal = new ModalBuilder()
      .setTitle('리마인드 등록')
      .setCustomId(ModalName.REMIND_ADD)
      .addComponents(
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          name
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          body
        )
      );

    await interaction.showModal(modal);
  },
};
