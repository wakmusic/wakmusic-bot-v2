import { RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { CommandName } from '../../constants';

export interface SlashCommand {
  name: CommandName;
  description: string;
  data: RESTPostAPIApplicationCommandsJSONBody;
  execute: (...args: any) => Promise<void> | void;
}
