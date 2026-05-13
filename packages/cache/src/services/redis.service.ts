import { Inject, Injectable } from '@nestjs/common';
import {
  type CacheModuleOptions,
  type CacheImplementation,
} from '../cache-module.interfaces.js';
import { MODULE_OPTIONS_TOKEN } from '../cache.module-definition.js';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements CacheImplementation {
  private readonly client: Redis;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: CacheModuleOptions,
  ) {
    this.client = new Redis(options.url); // You can configure the Redis client with options if needed
  }
  getHello(): string {
    return 'Hello World!';
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
