import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { NoticeService } from '../../../services/NoticeService';
import moment from 'moment';

const noticePeriodCommand: SubCommand = {
  name: CommandName.NOTICE_SUB_CHANGE_PERIOD,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const noticeService = Container.get(NoticeService);

    const noticeId = interaction.options.getInteger(OptionId.NOTICE_ID, true);
    const period = interaction.options.getInteger(OptionId.NOTICE_PERIOD, true);

    const notice = await noticeService.fineOne(noticeId);
    if (notice === null) {
      await interaction.editReply({ content: '없는 공지입니다.' });
      return;
    }

    const startTime = moment(notice.startAt);
    startTime.add(period, 'd');

    try {
      await noticeService.update(notice.id, { endAt: startTime.valueOf() });
    } catch (error) {
      await interaction.editReply({ content: '공지를 수정하지 못했습니다.' });
      return;
    }

    await interaction.editReply({
      content: `${notice.title}(\`${notice.id}\`)의 노출 시간이 ${period}일로 설정되었습니다.`,
    });
  },
};

export { noticePeriodCommand };
