import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { WebsiteService } from '@requester/store';
import { CreateWebsiteDto } from './dto/create-website.dto.js';
import { UpdateWebsiteDto } from './dto/update-website.dto.js';
import { CacheService } from '@requester/cache';
import { WEBSITE_CACHE_KEY } from './websites.constants.js';

@Injectable()
export class WebsitesService {
  constructor(
    private cacheService: CacheService,
    private readonly websiteService: WebsiteService,
    private eventEmitter: EventEmitter2,
  ) {}

  list() {
    return this.websiteService.list();
  }

  find(id: number) {
    return this.websiteService.find(id);
  }

  async delete(id: number) {
    const website = await this.websiteService.find(id);
    if (website) {
      const result = await this.websiteService.delete(id);
      this.eventEmitter.emit('publisher:updated', { id: website.publisherId });
      return result;
    }
    return null;
  }

  async create(website: CreateWebsiteDto) {
    const result = await this.websiteService.create(website);
    this.eventEmitter.emit('publisher:updated', { id: result.publisherId });
    return result;
  }

  async update(id: number, website: UpdateWebsiteDto) {
    const result = await this.websiteService.update(id, website);
    this.eventEmitter.emit('publisher:updated', { id: result.raw.publisherId });
    return result;
  }

  @OnEvent('website:updated')
  handleWebsiteUpdatedEvent(payload: { id: number }) {
    console.log('Website updated event received for website ID:', payload.id);
    this.cacheService.del(
      WEBSITE_CACHE_KEY.replace(':id', `:${payload.id.toString()}`),
    );
  }
}
