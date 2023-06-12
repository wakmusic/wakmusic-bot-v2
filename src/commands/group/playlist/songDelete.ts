import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';
import { logger } from '../../../utils';

const playlistSongDeleteCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_SONG_DELETE,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistKey = interaction.options.getString(
      OptionId.PLAYLIST_KEY,
      true
    );
    const songId = interaction.options.getString(OptionId.SONG_ID, true);

    const playlistService = Container.get(PlaylistService);

    const playlist = await playlistService.findOneByKey(playlistKey);
    if (playlist === null) {
      await interaction.editReply({
        content: '존재하지 않는 플레이리스트 입니다.',
      });
      return;
    }

    const playlistSong = playlist.songs.find(
      (playlistSong) => playlistSong.song.songId === songId
    );
    if (playlistSong === undefined) {
      await interaction.editReply({
        content: '플레이리스트에 없는 노래입니다.',
      });
      return;
    }

    try {
      await playlistService.removeSong(playlistSong.id);
    } catch (error) {
      logger.error('song delete command\n' + error);

      await interaction.editReply({
        content: '노래를 삭제하지 못했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `${playlistSong.song.songId}(이)가 ${playlist.title}에서 삭제되었습니다.`,
    });
  },
};

export { playlistSongDeleteCommand };
