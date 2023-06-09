import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';
import { logger } from '../../../utils';

const playlistDeleteCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_DELETE,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistService = Container.get(PlaylistService);

    const playlistId = interaction.options.getString(
      OptionId.PLAYLIST_KEY,
      true
    );

    const playlist = await playlistService.findOneByKey(playlistId);
    if (playlist === null) {
      await interaction.editReply({
        content: '존재하지 않는 재생목록입니다.',
      });
      return;
    }

    try {
      await playlistService.remove(playlist.id);
    } catch (error) {
      logger.error(error);

      await interaction.editReply({
        content: '재생목록을 삭제하던중 오류가 발생했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `${playlist.title}(\`${playlist.key}\`)(을)를 삭제하였습니다.`,
    });
  },
};

export { playlistDeleteCommand };
