import { Events, Interaction } from 'discord.js';
import { Event } from '../templates';
import { modals } from '../commands';
import { logger } from '../utils';

const modalEvent: Event = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction): Promise<void> => {
    if (!interaction.isModalSubmit()) return;

    const modal = modals.get(interaction.customId);
    if (modal === undefined) return;

    try {
      await modal.execute(interaction);
    } catch (error) {
      logger.error(error);
    }
  },
};

export { modalEvent };
