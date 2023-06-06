import { Client } from 'discord.js';
import { Handler } from '../templates';
import { eventHandler } from './eventHandler';
import { commandHandler } from './commandHandler';
import { logger } from '../utils';
import { dataSourceHandler } from './dataSourceHandler';

const handlers: Array<Handler> = [
  eventHandler,
  commandHandler,
  dataSourceHandler,
];

const loadAllHandlers = async (client: Client) => {
  const result = await Promise.all(
    handlers.map((handler) => handler.load && handler.execute(client))
  );
  logger.info(`Successfully loaded ${result.length} Handlers.`);
};

export { handlers, loadAllHandlers };
