import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { CategoryService } from '../../../services';
import { logger } from '../../../utils';

const qnaCategoryAddCommand: SubCommand = {
  name: CommandName.QNA_SUB_CATEGORY_ADD,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const categoryService = Container.get(CategoryService);

    const categoryName = interaction.options.getString(
      OptionId.CATEGORY_NAME,
      true
    );

    const category = await categoryService.findOneByTypeAndName(
      'qna',
      categoryName
    );
    if (category !== null) {
      await interaction.editReply({ content: '이미 존재하는 카테고리입니다.' });
      return;
    }

    try {
      await categoryService.add({
        type: 'qna',
        category: categoryName,
      });
    } catch (error) {
      logger.error(error);

      await interaction.editReply({
        content: '카테고리를 추가하지 못했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `(\`${categoryName}\`)(이)가 추가되었습니다.`,
    });
  },
};

export { qnaCategoryAddCommand };
