import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import { logger } from '../../../utils';
import Container from 'typedi';
import { FileService } from '../../../services/FileService';

const lyricsUploadCommand: SubCommand = {
  name: CommandName.LYRICS_SUB_UPLOAD,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const fileService = Container.get(FileService);

    const lyricsURL = interaction.options.getAttachment(
      OptionId.LYRICS_FILE,
      true
    );
    const songId = interaction.options.getString(OptionId.SONG_ID, true);

    try {
      let lyrics = await fileService.downloadLyrics(lyricsURL.url, songId);
      if (lyrics.split('.').pop()! === 'srt') {
        lyrics = await fileService.convertSrtToVtt(songId);
      }

      await interaction.editReply({
        content: `가사가 테스트 서버에 업로드되었습니다.\n검수 URL : https://lyrics.wakmusic.xyz/${songId}`,
      });
      return;
    } catch (error) {
      logger.error(error);

      await interaction.editReply({
        content: '가사를 업로드하지 못했습니다.',
      });
      return;
    }
  },
};

export { lyricsUploadCommand };
