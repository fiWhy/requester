import { CacheModuleType } from './cache.constants.js';

export type CacheModuleOptions = {
  type: CacheModuleType;
  url: string;
};

export type CacheableOptions = {
  ttl?: number;
  key: string;
};

export interface CacheImplementation {
  getHello(): string;

  get<T>(key: string): Promise<T | null>;

  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  del(key: string): Promise<void>;
}
