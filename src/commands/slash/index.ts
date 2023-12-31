import { Collection } from 'discord.js';
import { SlashCommand } from '../../templates';
import { qnaCommand } from './qna';
import { playlistCommand } from './playlist';
import { noticeCommand } from './notice';
import { lyricsCommand } from './lyrics';

const slashCommandList: Array<SlashCommand> = [
  qnaCommand,
  playlistCommand,
  noticeCommand,
  lyricsCommand,
];
const slashCommands: Collection<string, SlashCommand> = new Collection<
  string,
  SlashCommand
>();

const loadSlashCommands = async (): Promise<void> => {
  for (const command of slashCommandList) {
    slashCommands.set(command.name, command);
  }
};

export { slashCommands, slashCommandList, loadSlashCommands };
