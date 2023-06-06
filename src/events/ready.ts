import { Events } from 'discord.js';
import { Event } from '../templates';
import { logger } from '../utils';

export const readyEvent: Event = {
  name: Events.ClientReady,
  once: true,
  execute: () => {
    logger.info('Bot started.');
  },
};
