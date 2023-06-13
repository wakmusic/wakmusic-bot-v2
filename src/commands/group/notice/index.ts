import { Collection } from 'discord.js';
import { SubCommand } from '../../../templates';
import { noticeListCommand } from './list';
import { noticeAddCommand } from './add';
import { noticeCategoryListCommand } from './categoryList';
import { noticeCategoryAddCommand } from './categoryAdd';
import { noticeCategoryDeleteCommand } from './categoryDelete';
import { noticeDeleteCommand } from './delete';
import { noticePeriodCommand } from './period';

const noticeSubCommandList: Array<SubCommand> = [
  noticeListCommand,
  noticeAddCommand,
  noticeDeleteCommand,
  noticePeriodCommand,
  noticeCategoryListCommand,
  noticeCategoryAddCommand,
  noticeCategoryDeleteCommand,
];
const noticeSubCommands = new Collection<string, SubCommand>();

const loadNoticeCommands = async () => {
  for (const subCommand of noticeSubCommandList) {
    noticeSubCommands.set(subCommand.name, subCommand);
  }
};

export { noticeSubCommands, loadNoticeCommands };
