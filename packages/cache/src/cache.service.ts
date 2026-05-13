import { Inject, Injectable } from '@nestjs/common';
import { STORE_CLIENT } from './cache.constants.js';
import { type CacheImplementation } from './cache-module.interfaces.js';

@Injectable()
export class CacheService implements CacheImplementation {
  constructor(
    @Inject(STORE_CLIENT) private readonly storeClient: CacheImplementation,
  ) {}
  getHello(): string {
    return this.storeClient.getHello();
  }

  async get<T>(key: string): Promise<T | null> {
    return this.storeClient.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.storeClient.set<T>(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.storeClient.del(key);
  }
}
