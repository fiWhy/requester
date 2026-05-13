import { Injectable } from '@nestjs/common';
import { PublisherService } from '@requester/store';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CacheService } from '@requester/cache';
import {
  PUBLISHER_CACHE_KEY,
  PUBLISHERS_LIST_CACHE_KEY,
} from './publishers.constants.js';

@Injectable()
export class PublishersService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly publisherService: PublisherService,
    private cacheService: CacheService,
  ) {}

  list() {
    return this.publisherService.list();
  }

  find(id: number) {
    return this.publisherService.find(id);
  }

  async delete(id: number) {
    const websites = await this.publisherService.listWebsites(id);
    const result = await this.publisherService.delete(id);

    for (const website of websites) {
      this.eventEmitter.emit('website:updated', { id: website.id });
    }

    return result;
  }

  create(publisher: CreatePublisherDto) {
    return this.publisherService.create(publisher);
  }

  update(id: number, publisher: UpdatePublisherDto) {
    return this.publisherService.update(id, publisher);
  }

  listWebsites(publisherId: number) {
    return this.publisherService.listWebsites(publisherId);
  }

  @OnEvent('publisher:updated')
  async handlePublisherUpdatedEvent(payload: { id: number }) {
    console.log(
      'Publisher updated event received for publisher ID:',
      payload.id,
    );
    await this.cacheService.del(PUBLISHERS_LIST_CACHE_KEY);
    await this.cacheService.del(
      PUBLISHER_CACHE_KEY.replace(':id', `:${payload.id.toString()}`),
    );
  }
}
