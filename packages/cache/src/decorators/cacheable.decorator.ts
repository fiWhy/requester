import { SetMetadata } from '@nestjs/common';
import { CacheableOptions } from '../cache-module.interfaces.js';
import { CACHEABLE_METADATA_KEY } from '../cache.constants.js';

export const Cacheable = (options: CacheableOptions) =>
  SetMetadata(CACHEABLE_METADATA_KEY, options);
