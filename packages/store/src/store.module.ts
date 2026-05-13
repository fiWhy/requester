import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers.js';
import { PublisherService } from './services/publisher.service.js';
import { WebsiteService } from './services/website.service.js';
import { StoreModuleOptions } from './store-module.interface.js';
import { ConfigurableModuleClass } from './store.module-definition.js';
import { StoreService } from './store.service.js';
import { DATA_SOURCE } from './store.constants.js';

@Module({
  providers: [StoreService, PublisherService, WebsiteService],
})
export class StoreModule extends ConfigurableModuleClass {
  static register(options: StoreModuleOptions): DynamicModule {
    const dynamic = super.register(options);
    return {
      ...dynamic,
      global: true,
      providers: [...(dynamic.providers ?? []), ...databaseProviders],
      exports: [StoreService, PublisherService, WebsiteService, DATA_SOURCE],
    };
  }
}
