import { Inject, Service } from 'typedi';
import { DataSource, RelationOptions } from 'typeorm';
import { RecommendedPlaylistEntity } from '../entitys/main/recommendedPlaylist.entity';
import {
  APIEmbedField,
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { ModalName, ModalOptionId } from '../constants';
import { RecommendedPlaylistSongEntity } from '../entitys/main/recommendedPlaylistSong.entity';
import { RecommendedPlaylistImageEntity } from '../entitys/main/recommendedPlaylistImage.entity';

@Service()
export class PlaylistService {
  constructor(
    @Inject('mainDataSource')
    private readonly mainDataSource: DataSource
  ) {}

  async findOne(id: number): Promise<RecommendedPlaylistEntity | null> {
    return await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistEntity, 'playlist')
      .leftJoinAndSelect('playlist.songs', 'songs')
      .leftJoinAndSelect('playlist.image', 'image')
      .where('playlist.id = :id', { id: id })
      .getOne();
  }

  async findOneByKey(key: string): Promise<RecommendedPlaylistEntity | null> {
    return await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistEntity, 'playlist')
      .leftJoinAndSelect('playlist.songs', 'songs')
      .leftJoinAndSelect('songs.song', 'song')
      .leftJoinAndSelect('playlist.image', 'image')
      .where('playlist.key = :key', { key })
      .orderBy('songs.order', 'ASC')
      .getOne();
  }

  async findLast(): Promise<RecommendedPlaylistEntity | null> {
    return await this.mainDataSource
      .createQueryBuilder()
      .select('playlist')
      .from(RecommendedPlaylistEntity, 'playlist')
      .orderBy('playlist.order', 'DESC')
      .getOne();
  }

  async findAll(): Promise<Array<RecommendedPlaylistEntity>> {
    return await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistEntity, 'playlist')
      .leftJoinAndSelect('playlist.songs', 'songs')
      .leftJoinAndSelect('playlist.image', 'image')
      .getMany();
  }

  async add(entity: Partial<RecommendedPlaylistEntity>): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistEntity, 'playlist')
      .insert()
      .values(entity)
      .execute();
  }

  async addSong(entity: Partial<RecommendedPlaylistSongEntity>): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistSongEntity, 'playlistSong')
      .insert()
      .values(entity)
      .execute();
  }

  async addImage(
    entity: Partial<RecommendedPlaylistImageEntity>
  ): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder()
      .insert()
      .into(RecommendedPlaylistImageEntity)
      .values(entity)
      .execute();
  }

  async remove(id: number): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistEntity, 'playlist')
      .delete()
      .from(RecommendedPlaylistEntity)
      .where('id = :id', { id: id })
      .execute();
  }

  async removeSong(id: number): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistSongEntity, 'song')
      .delete()
      .from(RecommendedPlaylistSongEntity)
      .where('id = :id', { id })
      .execute();
  }

  async updateImage(
    id: number,
    entity: Partial<RecommendedPlaylistImageEntity>
  ): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder()
      .update(RecommendedPlaylistImageEntity)
      .set(entity)
      .where('id = :id', { id })
      .execute();
  }

  async updatePublic(key: string, isPublic: boolean): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder(RecommendedPlaylistEntity, 'playlist')
      .update()
      .set({
        public: isPublic,
      })
      .where('key = :key', { key })
      .execute();
  }

  createImage(
    playlist: RecommendedPlaylistEntity
  ): Partial<RecommendedPlaylistImageEntity> {
    return {
      playlist: playlist,
      square: 1,
      round: 1,
    };
  }

  calSongOrder(songs: Array<RecommendedPlaylistSongEntity>): number {
    const lastOrder =
      songs.length !== 0
        ? songs.reduce(
            (order, curr) => (curr.order > order ? curr.order : order),
            0
          )
        : 0;

    return lastOrder + 1;
  }

  toEmbedFields(
    playlists: Array<RecommendedPlaylistEntity>
  ): Array<APIEmbedField> {
    return playlists.map((playlist) => {
      return {
        name: `${playlist.title}(\`${playlist.key}\`)`,
        value: `\`${playlist.public ? '공개' : '비공개'}\` | ${
          playlist.songs.length
        }곡`,
      };
    });
  }

  createAddModal(): ModalBuilder {
    const id = new TextInputBuilder()
      .setCustomId(ModalOptionId.PLAYLIST_ID)
      .setLabel('재생목록 ID')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const name = new TextInputBuilder()
      .setCustomId(ModalOptionId.PLAYLIST_NAME)
      .setLabel('재생목록 이름')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    return new ModalBuilder()
      .setTitle('재생목록 생성')
      .setCustomId(ModalName.PLAYLIST_ADD)
      .addComponents(
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          id
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          name
        )
      );
  }
}
