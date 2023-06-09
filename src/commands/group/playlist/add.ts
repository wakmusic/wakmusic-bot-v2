import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';

const playlistAddCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_ADD,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const playlistService = Container.get(PlaylistService);

    await interaction.showModal(playlistService.createAddModal());
  },
};

export { playlistAddCommand };
