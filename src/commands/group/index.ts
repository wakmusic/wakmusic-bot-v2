import { SubCommand } from '../../templates';
import { logger } from '../../utils';
import { loadQnaCommands } from './qna';

const groupCommands: Array<SubCommand> = [];
const subCommandLoaders: Array<() => Promise<void>> = [loadQnaCommands];

const loadAllSubCommands = async (): Promise<void> => {
  const result = await Promise.all(subCommandLoaders.map((loader) => loader()));
  logger.info(`Successfully loaded ${result.length} subcommands.`);
};

export { groupCommands, loadAllSubCommands };
