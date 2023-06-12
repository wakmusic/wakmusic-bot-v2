import { ModalSubmitInteraction } from 'discord.js';
import { ModalName, ModalOptionId } from '../../constants';
import { Modal } from '../../templates';
import Container from 'typedi';
import { PlaylistService } from '../../services';
import { logger } from '../../utils';
import { moment } from '../../configs/moment.config';

const playlistAddModal: Modal = {
  id: ModalName.PLAYLIST_ADD,
  execute: async (interaction: ModalSubmitInteraction): Promise<void> => {
    await interaction.deferReply();

    const playlistService = Container.get(PlaylistService);

    const platlistId = interaction.fields.getTextInputValue(
      ModalOptionId.PLAYLIST_ID
    );
    const playlistName = interaction.fields.getTextInputValue(
      ModalOptionId.PLAYLIST_NAME
    );

    const isPlaylistExist = await playlistService.findOneByKey(platlistId);
    if (isPlaylistExist) {
      await interaction.editReply({
        content: '이미 존재하는 플레이리스트 입니다.',
      });
      return;
    }
    let order = 1;
    const lastPlaylist = await playlistService.findLast();
    if (lastPlaylist !== null) {
      order = lastPlaylist.order + 1;
    }
    try {
      await playlistService.add({
        key: platlistId,
        title: playlistName,
        createAt: moment().valueOf(),
        order,
      });

      const createdPlaylist = await playlistService.findOneByKey(platlistId);
      if (createdPlaylist === null) {
        await interaction.editReply({
          content: '재생목록을 생성하지 못했습니다.',
        });
        return;
      }

      await playlistService.addImage({
        playlist: createdPlaylist,
        square: 0,
        round: 0,
      });
    } catch (error) {
      logger.error(error);

      await interaction.editReply({
        content: '재생목록을 생성하지 못했습니다.',
      });
      return;
    }

    await interaction.editReply({
      content: `${playlistName}(\`${platlistId}\`) 재생목록이 추가되었습니다.\n\`/재생목록 (사각/원형)아이콘\` 명령어를 사용해 아이콘을 업로드 해주세요.`,
    });
  },
};

export { playlistAddModal };
