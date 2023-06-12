import { Events, Interaction } from 'discord.js';
import { Event } from '../templates';
import { slashCommands } from '../commands';
import { logger } from '../utils';

export const slashCommandEvent: Event = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isCommand() || !interaction.isChatInputCommand()) return;

    const command = slashCommands.get(interaction.commandName);
    if (command === undefined) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.log(error);
      logger.error('slash command handler error\n' + error);
    }
  },
};
