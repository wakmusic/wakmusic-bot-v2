import { ModalSubmitInteraction } from 'discord.js';
import { ModalName } from '../../constants';

export interface Modal {
  id: ModalName;
  execute: (interaction: ModalSubmitInteraction) => Promise<void> | void;
}
