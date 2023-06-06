import { REST, Routes } from 'discord.js';
import { slashCommands } from '../commands';
import { logger } from '../configs/logger.config';

const deployCommands = async (): Promise<void> => {
  const commands = slashCommands.map((command) => command.data);
  const rest = new REST();

  if (!process.env.TOKEN || !process.env.CLIENT_ID) return;
  rest.setToken(process.env.TOKEN);

  try {
    logger.info(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    logger.info(`Successfully reloaded application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    logger.error(error);
  }
};

export { deployCommands };
