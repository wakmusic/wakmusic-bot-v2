import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { NoticeService } from '../../../services/NoticeService';

const noticeDeleteCommand: SubCommand = {
  name: CommandName.NOTICE_SUB_DELETE,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const noticeService = Container.get(NoticeService);

    const noticeId = interaction.options.getInteger(OptionId.NOTICE_ID, true);

    const notice = await noticeService.fineOne(noticeId);
    if (notice === null) {
      await interaction.editReply({
        content: '없는 공지입니다.',
      });
      return;
    }

    try {
      await noticeService.remove(noticeId);
    } catch (error) {
      await interaction.editReply({
        content: '공지를 지우지 못했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `${notice.title}(\`${notice.id}\`)(을)를 삭제했습니다.`,
    });
  },
};

export { noticeDeleteCommand };
