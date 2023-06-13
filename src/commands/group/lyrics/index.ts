import { Collection } from 'discord.js';
import { SubCommand } from '../../../templates';
import { lyricsUploadCommand } from './upload';
import { lyricsDeployCommand } from './deploy';

const lyricsSubCommandList: Array<SubCommand> = [
  lyricsUploadCommand,
  lyricsDeployCommand,
];
const lyricsSubCommands = new Collection<string, SubCommand>();

const loadLyricsCommands = async () => {
  for (const command of lyricsSubCommandList) {
    lyricsSubCommands.set(command.name, command);
  }
};

export { lyricsSubCommands, loadLyricsCommands };
