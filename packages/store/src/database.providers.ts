import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { entities } from '../entities/index.js';
import { StoreModuleOptions } from './index.js';
import { DATA_SOURCE } from './store.constants.js';
import { MODULE_OPTIONS_TOKEN } from './store.module-definition.js';

const isProduction = process.env.NODE_ENV === 'production';

export const repositoriesProviders: Provider[] = entities.map((entity) => ({
  provide: entity.name,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
  inject: [DATA_SOURCE],
}));

export const getDataSourceProvider = (): Provider => ({
  provide: DATA_SOURCE,
  useFactory: (options: StoreModuleOptions) => {
    const dataSource = new DataSource({
      type: options.type,
      url: options.url,
      entities,
      synchronize: !isProduction,
    });

    return dataSource.initialize();
  },
  inject: [MODULE_OPTIONS_TOKEN],
});

export const databaseProviders: Provider[] = [
  getDataSourceProvider(),
  ...repositoriesProviders,
];
