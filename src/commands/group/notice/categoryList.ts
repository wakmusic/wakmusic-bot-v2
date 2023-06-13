import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { CategoryService } from '../../../services';

const noticeCategoryListCommand: SubCommand = {
  name: CommandName.NOTICE_SUB_CATEGORY_LIST,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const categoryService = Container.get(CategoryService);
    const categories = await categoryService.findByType('notice');

    await interaction.editReply({
      embeds: [categoryService.createEmbed('공지', categories)],
    });
  },
};

export { noticeCategoryListCommand };
