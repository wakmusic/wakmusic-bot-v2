import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { NewsEntity } from '../entitys/main/news.entity';
import { NoticeEntity } from '../entitys/main/notice.entity';
import { QnaEntity } from '../entitys/main/qna.entity';
import { ArtistEntity } from '../entitys/main/artistEntity';
import { ArtistImageVersionEntity } from '../entitys/main/artistImageVersion.entity';
import { CategoryEntity } from '../entitys/main/category.entity';
import { ChartDailyEntity } from '../entitys/main/chartDaily.entity';
import { ChartHourlyEntity } from '../entitys/main/chartHourly.entity';
import { ChartMonthlyEntity } from '../entitys/main/chartMonthly.entity';
import { ChartTotalEntity } from '../entitys/main/chartTotal.entity';
import { ChartUpdatedEntity } from '../entitys/main/chartUpdated.entity';
import { ChartWeeklyEntity } from '../entitys/main/chartWeekly.entity';
import { GroupEntity } from '../entitys/main/group.entity';
import { LikeEntity } from '../entitys/main/like.entity';
import { PlaylistEntity } from '../entitys/main/playlist.entity';
import { PlaylistCopyEntity } from '../entitys/main/playlistCopy.entity';
import { PlaylistCopyLogEntity } from '../entitys/main/playlistCopyLog.entity';
import { PlaylistImageEntity } from '../entitys/main/playlistImage.entity';
import { PlaylistSongEntity } from '../entitys/main/playlistSong.entity';
import { ProfileEntity } from '../entitys/main/profile.entity';
import { RecommendedPlaylistEntity } from '../entitys/main/recommendedPlaylist.entity';
import { RecommendedPlaylistImageEntity } from '../entitys/main/recommendedPlaylistImage.entity';
import { RecommendedPlaylistSongEntity } from '../entitys/main/recommendedPlaylistSong.entity';
import { SongEntity } from '../entitys/main/song.entity';
import { TeamEntity } from '../entitys/main/team.entity';
import { UserEntity } from '../entitys/main/user.entity';
import { UserAccessLogEntity } from '../entitys/main/userAccessLog.entity';
import { UserLikeEntity } from '../entitys/main/userLike.entity';
import { UserLikeSongEntity } from '../entitys/main/userLikeSong.entity';
import { UserPermissionEntity } from '../entitys/main/userPermission.entity';
import { UserPlaylistEntity } from '../entitys/main/userPlaylist.entity';
import { UserPlaylistPlaylistEntity } from '../entitys/main/userPlaylistPlaylist.entity';
import { EventEntity } from '../entitys/app/event.entity';
import { VersionEntity } from '../entitys/app/version.entity';

dotenv.config();

const mainDatabase: DataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: 'main',
  bigNumberStrings: false,
  supportBigNumbers: true,
  entities: [
    ArtistEntity,
    ArtistImageVersionEntity,
    CategoryEntity,
    ChartDailyEntity,
    ChartHourlyEntity,
    ChartMonthlyEntity,
    ChartTotalEntity,
    ChartUpdatedEntity,
    ChartWeeklyEntity,
    GroupEntity,
    LikeEntity,
    NewsEntity,
    NoticeEntity,
    PlaylistEntity,
    PlaylistCopyEntity,
    PlaylistCopyLogEntity,
    PlaylistImageEntity,
    PlaylistSongEntity,
    ProfileEntity,
    QnaEntity,
    RecommendedPlaylistEntity,
    RecommendedPlaylistImageEntity,
    RecommendedPlaylistSongEntity,
    SongEntity,
    TeamEntity,
    UserEntity,
    UserAccessLogEntity,
    UserLikeEntity,
    UserLikeSongEntity,
    UserPermissionEntity,
    UserPlaylistEntity,
    UserPlaylistPlaylistEntity,
  ],
});

const appDatabase: DataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: 'app',
  bigNumberStrings: false,
  supportBigNumbers: true,
  entities: [EventEntity, VersionEntity],
});

const allDatabases: Array<DataSource> = [mainDatabase];

export { allDatabases };
