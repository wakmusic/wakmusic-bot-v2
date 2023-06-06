import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { CategoryService } from '../../../services';

const qnaCategoryListCommand: SubCommand = {
  name: CommandName.QNA_SUB_CATEGORY_LIST,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const categoryService = Container.get(CategoryService);
    const categories = await categoryService.findByType('qna');

    await interaction.editReply({
      embeds: [categoryService.createEmbed('Q&A', categories)],
    });
  },
};

export { qnaCategoryListCommand };
