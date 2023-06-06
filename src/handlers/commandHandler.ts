import { Client } from 'discord.js';
import { Handler } from '../templates';
import { loadAllSubCommands, loadModals, loadSlashCommands } from '../commands';

const commandHandler: Handler = {
  load: true,
  execute: async (client: Client<boolean>): Promise<void> => {
    await loadSlashCommands();
    await loadAllSubCommands();
    await loadModals();
  },
};

export { commandHandler };
