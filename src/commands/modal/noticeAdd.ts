import { ModalSubmitInteraction } from 'discord.js';
import { ModalName, ModalOptionId } from '../../constants';
import { Modal } from '../../templates';
import Container from 'typedi';
import { NoticeService } from '../../services/NoticeService';
import { CategoryService } from '../../services';
import { FileService } from '../../services/FileService';
import moment from 'moment';
import { logger } from '../../utils';

const noticeAddModal: Modal = {
  id: ModalName.NOTICE_ADD,
  execute: async (interaction: ModalSubmitInteraction): Promise<void> => {
    await interaction.deferReply();

    const noticeService = Container.get(NoticeService);
    const categoryService = Container.get(CategoryService);
    const fileService = Container.get(FileService);

    const categoryName = interaction.fields.getTextInputValue(
      ModalOptionId.NOTICE_CATEGORY
    );
    const title = interaction.fields.getTextInputValue(
      ModalOptionId.NOTICE_TITLE
    );
    const mainText = interaction.fields.getTextInputValue(
      ModalOptionId.NOTICE_MAIN_TEXT
    );
    const images = interaction.fields
      .getTextInputValue(ModalOptionId.NOTICE_IMAGES)
      .split('\n');
    const startAt = interaction.fields.getTextInputValue(
      ModalOptionId.NOTICE_START_DATE
    );

    const category = await categoryService.findOneByTypeAndName(
      'notice',
      categoryName
    );
    if (category === null) {
      await interaction.editReply({ content: '존재하지 않는 카테고리입니다.' });
      return;
    }

    let imageList = await fileService.uploadManyImage('static/notice', images);
    imageList = imageList.map((image) => {
      if (image === null) return null;

      return image.split('/').pop()!;
    });
    const thumbnail = imageList.shift();
    if (thumbnail === null || thumbnail == undefined) {
      await interaction.editReply({
        content: '공지를 생성하지 못했습니다.',
      });
      return;
    }

    const currentTime = moment();
    const startTime = moment(startAt, 'YYYY-MM-DD');
    const endTime = moment(startAt, 'YYYY-MM-DD');
    endTime.add(7, 'd');
    try {
      await noticeService.add({
        category: category,
        title: title,
        mainText: mainText,
        thumbnail: thumbnail,
        images: imageList.filter(
          (image): image is string => typeof image === 'string'
        ),
        createAt: currentTime.valueOf(),
        startAt: startTime.valueOf(),
        endAt: endTime.valueOf(),
      });
    } catch (error) {
      logger.error(error);

      await interaction.editReply({
        content: '공지를 생성하지 못했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `**${title}** 공지가 추가되었습니다.`,
    });
  },
};

export { noticeAddModal };
