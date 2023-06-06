import { slashCommandEvent } from './slashCommand';
import { readyEvent } from './ready';
import { modalEvent } from './modal';

export const events = [readyEvent, slashCommandEvent, modalEvent];
