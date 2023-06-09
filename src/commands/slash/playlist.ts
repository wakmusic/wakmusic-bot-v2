import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../templates';
import { CommandName, OptionId } from '../../constants';
import { playlistSubCommands } from '../group/playlist';

const playlistCommand: SlashCommand = {
  name: CommandName.PLAYLIST,
  description: '왁타버스 뮤직 추천 플레이리스트 명령어 입니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.PLAYLIST)
    .setDescription('왁타버스 뮤직 추천 플레이리스트 명령어 입니다.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.PLAYLIST_SUB_LIST)
        .setDescription('추천 재생목록을 모두 불러옵니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.PLAYLIST_SUB_ADD)
        .setDescription('재생목록을 생성합니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.PLAYLIST_SUB_DELETE)
        .setDescription('재생목록을 삭제합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.PLAYLIST_KEY)
            .setDescription('재생목록 고유 id 입니다.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.PLAYLIST_SUB_TOGGLE_PUBLIC)
        .setDescription('재생목록 공개 여부를 설정합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.PLAYLIST_KEY)
            .setDescription('재생목록 고유 id 입니다.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.PLAYLIST_SUB_SONG_LIST)
        .setDescription('재생목록 곡 목록입니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.PLAYLIST_KEY)
            .setDescription('재생목록 id')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.PLAYLIST_SUB_SONG_ADD)
        .setDescription('재생목록에 노래를 추가합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.PLAYLIST_KEY)
            .setDescription('재생목록 id')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName(OptionId.SONG_ID)
            .setDescription('노래 ID')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.PLAYLIST_SUB_SONG_DELETE)
        .setDescription('재생목록에 있는 노래를 삭제합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.PLAYLIST_KEY)
            .setDescription('재생목록 id')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName(OptionId.SONG_ID)
            .setDescription('노래 ID')
            .setRequired(true)
        )
    )
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const subCommandName = interaction.options.getSubcommand(true);
    if (subCommandName === '') return;

    const subCommand = playlistSubCommands.get(subCommandName);
    if (subCommand === undefined) return;

    await subCommand.execute(interaction);
  },
};

export { playlistCommand };
