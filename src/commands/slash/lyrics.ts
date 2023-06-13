import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandName, OptionId } from '../../constants';
import { SlashCommand } from '../../templates';
import { lyricsSubCommands } from '../group/lyrics';

const lyricsCommand: SlashCommand = {
  name: CommandName.LYRICS,
  description: '가사 배포 명령어입니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.LYRICS)
    .setDescription('가사 배포 명령어 입니다.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.LYRICS_SUB_UPLOAD)
        .setDescription('가사를 테스트 서버에 업로드 합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.SONG_ID)
            .setDescription('노래 Id')
            .setRequired(true)
        )
        .addAttachmentOption((option) =>
          option
            .setName(OptionId.LYRICS_FILE)
            .setDescription('가사 파일')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.LYRICS_SUB_DEPLOY)
        .setDescription('가사를 본 서버에 배포합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.SONG_ID)
            .setDescription('노래 Id')
            .setRequired(true)
        )
    )
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const subCommandName = interaction.options.getSubcommand(true);
    if (subCommandName === '') return;

    const subCommand = lyricsSubCommands.get(subCommandName);
    if (subCommand === undefined) return;

    await subCommand.execute(interaction);
  },
};

export { lyricsCommand };
