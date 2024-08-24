import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { loadAllHandlers } from './handlers';
import { deployCommands } from './utils/deployCommand';
import 'reflect-metadata';

const main = async () => {
  dotenv.config();

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent,
    ],
  });

  await loadAllHandlers(client);
  if (process.env.DEPLOY === 'true') {
    await deployCommands();
  }
  await client.login(process.env.TOKEN);
};

main();
