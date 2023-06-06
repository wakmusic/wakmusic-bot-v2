import { Client } from 'discord.js';
import { Handler } from '../templates';
import { allDatabases } from '../configs/typeorm.config';
import { logger } from '../utils';
import Container from 'typedi';

const dataSourceHandler: Handler = {
  load: true,
  execute: async (client: Client): Promise<void> => {
    const results = await Promise.all(
      allDatabases.map((dataSource) => dataSource.initialize())
    );
    for (const dataSource of results) {
      Container.set(`${dataSource.options.database}DataSource`, dataSource);
    }
    logger.info(`Successfully initialized ${results.length} DataSources.`);
  },
};

export { dataSourceHandler };
