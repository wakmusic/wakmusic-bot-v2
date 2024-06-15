import { ModalSubmitInteraction } from 'discord.js';
import { ModalName } from '../../constants';
import { Modal } from '../../templates';

export const remindAddModal: Modal = {
  id: ModalName.REMIND_ADD,
  execute: async (interaction: ModalSubmitInteraction) => {
    // TODO: 모달 인터렉션, 큐 등록 로직 구현
  },
};
