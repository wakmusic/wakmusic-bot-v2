import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';
import { logger } from '../../../utils';

const playlistTogglePublicCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_TOGGLE_PUBLIC,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistKey = interaction.options.getString(
      OptionId.PLAYLIST_KEY,
      true
    );

    const playlistSerivce = Container.get(PlaylistService);

    const playlist = await playlistSerivce.findOneByKey(playlistKey);
    if (playlist === null) {
      await interaction.editReply({
        content: '존재하지 않는 플레이리스트 입니다.',
      });
      return;
    }

    const currentPublicState = !playlist.public;

    try {
      await playlistSerivce.updatePublic(playlistKey, currentPublicState);
    } catch (error) {
      logger.error('toggle public command error\n' + error);

      await interaction.editReply({ content: '오류가 발생했습니다.' });
      return;
    }

    await interaction.editReply({
      content: `${playlist.title}(\`${playlist.key}\`)(을)를 ${
        currentPublicState ? '공개' : '비공개'
      } 상태로 설정하였습니다.`,
    });
  },
};

export { playlistTogglePublicCommand };
