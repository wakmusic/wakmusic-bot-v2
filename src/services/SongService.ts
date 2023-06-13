import { Inject, Service } from 'typedi';
import { DataSource } from 'typeorm';
import { SongEntity } from '../entitys/main/song.entity';
import { APIEmbedField } from 'discord.js';
import { LyricsEntity } from '../entitys/main/lyrics.entity';

@Service()
export class SongService {
  constructor(
    @Inject('mainDataSource')
    private readonly mainDataSource: DataSource
  ) {}

  async findOneBySongId(songId: string): Promise<SongEntity | null> {
    return await this.mainDataSource
      .createQueryBuilder(SongEntity, 'song')
      .where('song.song_id = :songId', { songId })
      .getOne();
  }

  async addLyrics(songId: string): Promise<void> {
    await this.mainDataSource
      .createQueryBuilder()
      .insert()
      .into(LyricsEntity)
      .values({
        key: songId,
      })
      .execute();
  }

  toEmbedFields(songs: Array<SongEntity>): Array<APIEmbedField> {
    return songs.map<APIEmbedField>((song) => {
      return {
        name: `${song.title}(\`${song.songId}\`)`,
        value: `${song.artist} / ${song.date}`,
      };
    });
  }
}
