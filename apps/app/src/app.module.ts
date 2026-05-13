import { Module } from '@nestjs/common';
import { CacheModule, CacheModuleType } from '@requester/cache';
import { StoreModule, StoreModuleType } from '@requester/store';
import { configDotenv } from 'dotenv';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PublishersModule } from './publishers/publishers.module.js';
import { WebsitesModule } from './websites/websites.module.js';

configDotenv();

@Module({
  imports: [
    CacheModule.register({
      type: CacheModuleType.Redis,
      url: process.env.CACHE_URL!,
    }),
    StoreModule.register({
      type: StoreModuleType.PostgreSQL,
      url: process.env.DATABASE_URL!,
    }),
    WebsitesModule,
    PublishersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
