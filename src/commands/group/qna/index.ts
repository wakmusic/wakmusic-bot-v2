import { Collection } from 'discord.js';
import { SubCommand } from '../../../templates';
import { qnaListCommand } from './list';
import { qnaAddCommand } from './add';
import { qnaDeleteCommand } from './delete';
import { qnaChangeCommand } from './change';
import { qnaCategoryAddCommand } from './categoryAdd';
import { qnaCategoryDeleteCommand } from './categoryDelete';
import { qnaCategoryListCommand } from './categoryList';

const qnaSubCommandList: Array<SubCommand> = [
  qnaListCommand,
  qnaAddCommand,
  qnaDeleteCommand,
  qnaChangeCommand,
  qnaCategoryAddCommand,
  qnaCategoryDeleteCommand,
  qnaCategoryListCommand,
];
const qnaSubCommands: Collection<string, SubCommand> = new Collection<
  string,
  SubCommand
>();

const loadQnaCommands = async () => {
  for (const command of qnaSubCommandList) {
    qnaSubCommands.set(command.name, command);
  }
};

export { qnaSubCommandList, qnaSubCommands, loadQnaCommands };
