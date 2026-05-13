import { Module } from '@nestjs/common';
import { WebsitesController } from './websites.controller.js';
import { WebsitesService } from './websites.service.js';

@Module({
  controllers: [WebsitesController],
  providers: [WebsitesService],
})
export class WebsitesModule {}
