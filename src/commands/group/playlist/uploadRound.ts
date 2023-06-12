import { ChatInputCommandInteraction } from 'discord.js';
import { CommandName, OptionId } from '../../../constants';
import { SubCommand } from '../../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../../services';
import { FileService } from '../../../services/FileService';
import { logger } from '../../../utils';

const playlistUploadRoundCommand: SubCommand = {
  name: CommandName.PLAYLIST_SUB_UPLOAD_ROUND,
  execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistService = Container.get(PlaylistService);
    const fileService = Container.get(FileService);

    const playlistKey = interaction.options.getString(
      OptionId.PLAYLIST_KEY,
      true
    );
    const squareIcon = interaction.options.getAttachment(
      OptionId.PLAYLIST_ROUND,
      true
    );

    const playlist = await playlistService.findOneByKey(playlistKey);
    if (playlist === null) {
      await interaction.editReply({
        content: '없는 플레이리스트 입니다.',
      });
      return;
    }

    const imageArrayBuffer = await fileService.downloadFromURL(squareIcon.url);
    const url = await fileService.uploadImage({
      path: 'static/playlist/icon/round',
      fileName: playlist.key,
      version: playlist.image.round + 1,
      fileType: 'png',
      data: imageArrayBuffer,
    });
    if (url === null) {
      await interaction.editReply({
        content: '이미지를 업로드하지 못했습니다.',
      });
      return;
    }

    try {
      await playlistService.updateImage(playlist.image.id, {
        round: playlist.image.round + 1,
      });
    } catch (error) {
      logger.error(error);

      await interaction.editReply({ content: '이미지를 저장하지 못했습니다.' });
      return;
    }

    await interaction.editReply({
      content: `이미지 업로드가 완료되었습니다.\n${url}`,
    });
  },
};

export { playlistUploadRoundCommand };
