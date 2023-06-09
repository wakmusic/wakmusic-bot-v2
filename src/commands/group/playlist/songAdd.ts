import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';
import { SongService } from '../../../services/SongService';
import { logger } from '../../../utils';

const playlistSongAddCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_SONG_ADD,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistKey = interaction.options.getString(
      OptionId.PLAYLIST_KEY,
      true
    );
    const songId = interaction.options.getString(OptionId.SONG_ID, true);

    const playlistService = Container.get(PlaylistService);
    const songService = Container.get(SongService);

    const playlist = await playlistService.findOneByKey(playlistKey);
    if (playlist === null) {
      await interaction.editReply({
        content: '존재하지않는 플레이리스트 입니다.',
      });
      return;
    }

    const song = await songService.findOneBySongId(songId);
    if (song === null) {
      await interaction.editReply({
        content: '존재하지 않는 노래입니다.',
      });
      return;
    }

    if (
      playlist.songs.find(
        (playlistSong) => playlistSong.song.songId === song.songId
      )
    ) {
      await interaction.editReply({
        content: '이미 추가되어 있는 노래입니다.',
      });
      return;
    }

    const order = playlistService.calSongOrder(playlist.songs);

    try {
      await playlistService.addSong({
        playlist,
        song,
        order,
      });
    } catch (error) {
      logger.error('song add command error' + error);

      await interaction.editReply({
        content: '노래를 추가하지 못했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `${song.songId}(이)가 ${playlist.title}에 추가되었습니다.`,
    });
  },
};

export { playlistSongAddCommand };
