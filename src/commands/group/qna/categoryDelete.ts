import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { CategoryService } from '../../../services';
import { logger } from '../../../utils';

const qnaCategoryDeleteCommand: SubCommand = {
  name: CommandName.QNA_SUB_CATEGORY_DELETE,
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
    if (category === null) {
      await interaction.editReply({ content: '존재하지 않는 카테고리입니다.' });
      return;
    }

    try {
      await categoryService.remove(category.id);
    } catch (error) {
      logger.error(error);

      await interaction.editReply({
        content: '카테고리를 삭제하지 못했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `(\`${category.category}\`)(을)를 삭제하였습니다.`,
    });
  },
};

export { qnaCategoryDeleteCommand };
