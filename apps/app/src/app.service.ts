import { Injectable } from '@nestjs/common';
import { Cacheable, CacheService } from '@requester/cache';
import { Publisher, PublisherService } from '@requester/store';

@Injectable()
export class AppService {
  constructor(
    private readonly publisherService: PublisherService,
    private readonly cacheService: CacheService,
  ) {}
  getHello(): string {
    console.log(this.cacheService.getHello());
    return 'Hello World!';
  }

  @Cacheable({ key: 'publishers', ttl: 60 })
  getPublishers(): Promise<Publisher[]> {
    return this.publisherService.list();
  }
}
