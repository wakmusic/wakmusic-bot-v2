import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js';
import { CommandName } from '../../constants';
import { SlashCommand } from '../../templates';
import Container from 'typedi';
import { FileService } from '../../services';
import { logger } from '../../utils';
import { TeamService } from '../../services/TeamService';
import moment from 'moment';
import { extname } from 'path';
import { lookup } from 'mime-types';

export const profileUpdateAllCommand: SlashCommand = {
  name: CommandName.PROFILE_UPDATE_ALL,
  description: '팀 정보 프로필을 업데이트 합니다.',
  data: new SlashCommandBuilder()
    .setName(CommandName.PROFILE_UPDATE_ALL)
    .setDescription('팀 정보 프로필을 업데이트 합니다.')
    .toJSON(),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (
      !(interaction.member as GuildMember).roles.cache.has(
        '1024676607237038161'
      )
    ) {
      await interaction.reply({
        content: '권한이 없습니다.',
      });
      return;
    }

    await interaction.deferReply();

    const fileService = Container.get(FileService);
    const teamService = Container.get(TeamService);

    const members = await interaction.guild.members.fetch();
    for (const member of members.values()) {
      const teamMember = await teamService.findOneByDiscordId(member.user.id);
      if (teamMember == null) {
        continue;
      }

      const avatarURL = member.user.avatarURL();
      if (avatarURL === null) continue;

      const ext = extname(avatarURL);
      const mime = lookup(ext);
      if (!mime) {
        continue;
      }

      try {
        const avatarData = await fileService.downloadFromURL(avatarURL);
        const now = moment().valueOf();

        const path = `team/profile/${
          member.user.username
        }_${now.toString()}${ext}`;

        await fileService.upload({
          path,
          data: avatarData,
          mime,
        });

        if (teamMember.profileId === 443) {
          await teamService.createProfile({
            teamMember: teamMember,
            name: member.user.username,
            path,
          });
        } else {
          await teamService.updateProfile({
            teamMember: teamMember,
            path,
          });
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.stack);
        logger.error(error);
      }
    }

    await interaction.editReply({
      content: '팀 정보 프로필을 업데이트 하였습니다.',
    });
  },
};
