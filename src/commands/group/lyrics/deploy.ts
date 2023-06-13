import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { FileService } from '../../../services';
import { SongService } from '../../../services';

const lyricsDeployCommand: SubCommand = {
  name: CommandName.LYRICS_SUB_DEPLOY,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const fileService = Container.get(FileService);
    const songService = Container.get(SongService);

    const songId = interaction.options.getString(OptionId.SONG_ID, true);

    const url = await fileService.uploadLyrics(songId);

    if (url === null) {
      await interaction.editReply({
        content: '가사를 배포하지 못했습니다.',
      });
      return;
    }

    await songService.addLyrics(songId);

    await interaction.editReply({
      content: '가사를 성공적으로 배포하였습니다.',
    });
  },
};

export { lyricsDeployCommand };
