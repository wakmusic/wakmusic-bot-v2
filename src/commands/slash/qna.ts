import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../templates';
import { CommandName, OptionId } from '../../constants';
import { qnaSubCommands } from '../group/qna';
import { logger } from '../../utils';

const qnaCommand: SlashCommand = {
  name: CommandName.QNA,
  description: '왁타버스 뮤직 질문 명령어 입니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.QNA)
    .setDescription('자주 묻는 질문 관련 명령어')
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.QNA_SUB_LIST)
        .setDescription('질문 목록을 확인합니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.QNA_SUB_ADD)
        .setDescription('질문을 추가합니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.QNA_SUB_DELETE)
        .setDescription('질문을 삭제합니다.')
        .addIntegerOption((option) =>
          option
            .setName(OptionId.QNA_ID)
            .setDescription('질문의 id입니다.')
            .setMinValue(1)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.QNA_SUB_CHANGE)
        .setDescription('질문의 내용을 변경합니다.')
        .addIntegerOption((option) =>
          option
            .setName(OptionId.QNA_ID)
            .setDescription('질문의 id입니다.')
            .setMinValue(1)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.QNA_SUB_CATEGORY_LIST)
        .setDescription('Q&A 카테고리 목록을 가져옵니다.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.QNA_SUB_CATEGORY_ADD)
        .setDescription('Q&A 카테고리를 추가합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.CATEGORY_NAME)
            .setDescription('Q&A 카테고리 이름')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName(CommandName.QNA_SUB_CATEGORY_DELETE)
        .setDescription('Q&A 카테고리를 삭제합니다.')
        .addStringOption((option) =>
          option
            .setName(OptionId.CATEGORY_NAME)
            .setDescription('Q&A 카테고리 이름')
            .setRequired(true)
        )
    )
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const subCommandName = interaction.options.getSubcommand(true);
    if (subCommandName === '') return;

    const subCommand = qnaSubCommands.get(subCommandName);
    if (subCommand === undefined) return;

    await subCommand.execute(interaction);
  },
};

export { qnaCommand };
