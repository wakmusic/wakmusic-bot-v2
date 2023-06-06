import { Collection } from 'discord.js';
import { Modal } from '../templates';

const modalStore: Collection<string, Modal> = new Collection<string, Modal>();

export { modalStore };
