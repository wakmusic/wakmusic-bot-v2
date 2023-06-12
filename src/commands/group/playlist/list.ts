import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';

const playlistListCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_LIST,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistService = Container.get(PlaylistService);

    const playlists = await playlistService.findAll();

    const fields = playlistService.toEmbedFields(playlists);
    const embed = new EmbedBuilder()
      .setTitle('추천 플레이리스트 목록')
      .setFields(fields);

    await interaction.editReply({ embeds: [embed] });
  },
};

export { playlistListCommand };
