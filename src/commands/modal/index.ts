import { Collection } from 'discord.js';
import { Modal } from '../../templates';
import { qnaAddModal } from './qnaAdd';
import { qnaChangeModal } from './qnaChange';
import { playlistAddModal } from './playlistAdd';

const modalList: Array<Modal> = [qnaAddModal, qnaChangeModal, playlistAddModal];
const modals: Collection<string, Modal> = new Collection<string, Modal>();

const loadModals = async (): Promise<void> => {
  for (const modal of modalList) {
    modals.set(modal.id, modal);
  }
};

export { modalList, modals, loadModals };
