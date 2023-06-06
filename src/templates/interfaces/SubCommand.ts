import { CommandName } from '../../constants';

export interface SubCommand {
  name: CommandName;
  execute: (...args: any) => Promise<void> | void;
}
