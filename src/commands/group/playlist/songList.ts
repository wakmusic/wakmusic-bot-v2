import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';
import { SongService } from '../../../services/SongService';
import { logger } from '../../../utils';

const playlistSongListCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_SONG_LIST,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistService = Container.get(PlaylistService);
    const songService = Container.get(SongService);

    const playlistKey = interaction.options.getString(
      OptionId.PLAYLIST_KEY,
      true
    );

    const playlist = await playlistService.findOneByKey(playlistKey);
    if (playlist === null) {
      await interaction.editReply({
        content: '존재하지 않는 재생목록입니다.',
      });
      return;
    }

    const embedFields = songService.toEmbedFields(
      playlist.songs.map((song) => song.song)
    );

    const embed = new EmbedBuilder()
      .setTitle(`${playlist.title} 곡 목록`)
      .addFields(embedFields);

    await interaction.editReply({ embeds: [embed] });
  },
};

export { playlistSongListCommand };
