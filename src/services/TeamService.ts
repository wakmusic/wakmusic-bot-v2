import { Inject, Service } from 'typedi';
import { TeamMemberEntity } from '../entitys/new/team-member.entity';
import { DataSource, IsNull } from 'typeorm';
import { ImageService } from './ImageService';
import moment from 'moment';

@Service()
export class TeamService {
  constructor(
    @Inject('DataSource')
    private readonly datasource: DataSource,

    private readonly imageService: ImageService
  ) {}

  async findOneByDiscordId(
    discordId: string
  ): Promise<TeamMemberEntity | null> {
    return await this.datasource.getRepository(TeamMemberEntity).findOne({
      where: {
        discordId,
        deletedAt: IsNull(),
      },
      relations: {
        profile: true,
      },
    });
  }

  async createProfile(options: {
    teamMember: TeamMemberEntity;
    name: string;
    path: string;
  }): Promise<void> {
    const now = moment().valueOf();

    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const imageId = await this.imageService.create({
        type: 'team-profile',
        name: options.name,
        path: options.path,
        qr,
      });

      await qr.manager.update(
        TeamMemberEntity,
        {
          id: options.teamMember.id,
        },
        {
          profileId: imageId,
          updatedAt: now,
        }
      );

      await qr.commitTransaction();
    } catch (error) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  async updateProfile(options: {
    teamMember: TeamMemberEntity;
    path: string;
  }): Promise<void> {
    await this.imageService.update({
      imageId: options.teamMember.profile.id,
      path: options.path,
    });
  }
}
