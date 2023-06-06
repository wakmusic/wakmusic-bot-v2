import { Client } from 'discord.js';
import { Handler } from '../templates';
import { events } from '../events';

export const eventHandler: Handler = {
  load: true,
  execute: async (client: Client<boolean>): Promise<void> => {
    for (const event of events) {
      if (event.once) {
        client.once(event.name, event.execute);
      } else {
        client.on(event.name, event.execute);
      }
    }
  },
};
