import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandName } from '../../constants';
import { SlashCommand } from '../../templates';
import Container from 'typedi';
import { FileService } from '../../services';
import { logger } from '../../utils';
import { TeamService } from '../../services/TeamService';
import moment from 'moment';
import { extname } from 'path';
import { lookup } from 'mime-types';

export const profileUpdateCommand: SlashCommand = {
  name: CommandName.PROFILE_UPDATE,
  description: '팀 정보 프로필을 업데이트 합니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.PROFILE_UPDATE)
    .setDescription('팀 정보 프로필을 업데이트 합니다.')
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply();

    const fileService = Container.get(FileService);
    const teamService = Container.get(TeamService);

    const teamMember = await teamService.findOneByDiscordId(
      interaction.user.id
    );
    if (teamMember == null) {
      await interaction.editReply({
        content: '팀 정보를 찾을 수 없습니다.',
      });
      return;
    }

    const avatarURL = interaction.user.avatarURL();
    const ext = extname(avatarURL);
    const mime = lookup(ext);
    if (!mime) {
      await interaction.editReply({
        content: '지원하지 않는 파일 형식입니다.',
      });
      return;
    }

    try {
      const avatarData = await fileService.downloadFromURL(avatarURL);
      const now = moment().valueOf();

      const path = `team/profile/${
        interaction.user.username
      }_${now.toString()}${ext}`;

      await fileService.upload({
        path,
        data: avatarData,
        mime,
      });

      if (teamMember.profileId === 443) {
        await teamService.createProfile({
          teamMember: teamMember,
          name: interaction.user.username,
          path,
        });
      } else {
        await teamService.updateProfile({
          teamMember: teamMember,
          path,
        });
      }

      await interaction.editReply({
        content: '프로필을 업데이트하였습니다.',
      });
    } catch (error) {
      logger.error(error);

      await interaction.editReply({
        content: '프로필을 업데이트하지 못했습니다.',
      });
    }
  },
};
