import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandName, OptionId } from '../../constants';
import { SlashCommand } from '../../templates';
import { noticeSubCommands } from '../group/notice';

const noticeCommand: SlashCommand = {
  name: CommandName.NOTICE,
  description: '공지 명령어입니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.NOTICE)
    .setDescription('공지 명령어 입니다.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.NOTICE_SUB_LIST)
        .setDescription('공지 목록을 가져옵니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.NOTICE_SUB_ADD)
        .setDescription('공지를 등록합니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.NOTICE_SUB_DELETE)
        .setDescription('공지를 삭제합니다.')
        .addIntegerOption((option) =>
          option
            .setName(OptionId.NOTICE_ID)
            .setDescription('공지 Id')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.NOTICE_SUB_CHANGE_PERIOD)
        .setDescription('공지의 노출시간을 변경합니다.')
        .addIntegerOption((option) =>
          option
            .setName(OptionId.NOTICE_ID)
            .setDescription('공지 Id')
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName(OptionId.NOTICE_PERIOD)
            .setDescription('노출시간 (일)')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.NOTICE_SUB_CATEGORY_LIST)
        .setDescription('공지 카테고리 목록을 가져옵니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.NOTICE_SUB_CATEGORY_ADD)
        .setDescription('공지 카테고리를 추가합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.CATEGORY_NAME)
            .setDescription('공지 카테고리 이름')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.NOTICE_SUB_CATEGORY_DELETE)
        .setDescription('공지 카테고리를 삭제합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.CATEGORY_NAME)
            .setDescription('공지 카테고리 이름')
            .setRequired(true)
        )
    )
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const subCommandName = interaction.options.getSubcommand(true);
    if (subCommandName === '') return;

    const subCommand = noticeSubCommands.get(subCommandName);
    if (subCommand === undefined) return;

    await subCommand.execute(interaction);
  },
};

export { noticeCommand };
