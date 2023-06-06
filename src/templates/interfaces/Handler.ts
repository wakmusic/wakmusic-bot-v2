import { Client } from 'discord.js';

export interface Handler {
  load: boolean;
  execute: (client: Client<boolean>) => Promise<void>;
}
