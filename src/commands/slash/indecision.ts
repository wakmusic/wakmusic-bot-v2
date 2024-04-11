import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandName } from '../../constants';
import { SlashCommand } from '../../templates';
import { randomInt } from 'crypto';

export const indecisionCommand: SlashCommand = {
  name: CommandName.INDECISION,
  description: '결정하기가 힘들떄 사용하는 명령어 입니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.INDECISION)
    .setDescription('결정하기가 힘들떄 사용하는 명령어 입니다.')
    .addStringOption((option) =>
      option.setName('option1').setDescription('옵션1').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('option2').setDescription('옵션1').setRequired(true)
    )
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply();
    await interaction.editReply({
      content: '두구두구...',
    });

    const options = [
      interaction.options.getString('option1', true),
      interaction.options.getString('option2', true),
    ];

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const select = randomInt(2);

    await interaction.editReply({
      content: options[select],
    });
  },
};
