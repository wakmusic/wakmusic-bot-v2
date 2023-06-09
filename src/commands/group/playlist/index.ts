import { Collection } from 'discord.js';
import { SubCommand } from '../../../templates';
import { playlistListCommand } from './list';
import { playlistAddCommand } from './add';
import { playlistDeleteCommand } from './delete';
import { playlistSongListCommand } from './songList';
import { playlistSongAddCommand } from './songAdd';
import { playlistSongDeleteCommand } from './songDelete';
import { playlistTogglePublicCommand } from './togglePublic';

const playlistSubCommandList: Array<SubCommand> = [
  playlistListCommand,
  playlistAddCommand,
  playlistDeleteCommand,
  playlistSongListCommand,
  playlistSongAddCommand,
  playlistSongDeleteCommand,
  playlistTogglePublicCommand,
];
const playlistSubCommands = new Collection<string, SubCommand>();

const loadPlaylistCommands = async () => {
  for (const subCommand of playlistSubCommandList) {
    playlistSubCommands.set(subCommand.name, subCommand);
  }
};

export { playlistSubCommands, loadPlaylistCommands };
