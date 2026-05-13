import { SetMetadata } from '@nestjs/common';
import { CACHE_EVICT_METADATA_KEY } from '../cache.constants.js';

export const CacheEvict = (key: string) =>
  SetMetadata(CACHE_EVICT_METADATA_KEY, key);
