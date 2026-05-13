import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { CacheableOptions } from '../cache-module.interfaces.js';
import {
  CACHE_EVICT_METADATA_KEY,
  CACHEABLE_METADATA_KEY,
} from '../cache.constants.js';
import { CacheService } from '../cache.service.js';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const options = this.reflector.get<CacheableOptions>(
      CACHEABLE_METADATA_KEY,
      context.getHandler(),
    );

    const evictKey = this.reflector.get<string>(
      CACHE_EVICT_METADATA_KEY,
      context.getHandler(),
    );

    console.log('CacheInterceptor: Intercepting request...');

    if (evictKey) {
      console.log(`CacheInterceptor: Evicting cache for key: ${evictKey}`);
      return from(this.cacheService.del(evictKey)).pipe(
        switchMap(() => next.handle()),
      );
    }

    if (!options) {
      console.log(
        'CacheInterceptor: No cache options found, skipping cache logic.',
      );

      return next.handle();
    }

    let cacheKey = options.key;
    const ttl = options.ttl;
    const request: {
      params: {
        id?: string;
      };
    } = context.switchToHttp().getRequest();

    if (cacheKey.includes(':id') && request.params.id) {
      cacheKey = cacheKey.replace(':id', `:${request.params.id}`);
    }

    console.log(`CacheInterceptor: Checking cache for key: ${cacheKey}`);

    return from(this.cacheService.get(cacheKey)).pipe(
      switchMap((cachedResponse) => {
        if (cachedResponse) {
          console.log(`CacheInterceptor: Cache hit for key: ${cacheKey}`);
          return of(cachedResponse);
        }

        console.log(
          `CacheInterceptor: Cache miss for key: ${cacheKey}, proceeding...`,
        );

        return next.handle().pipe(
          switchMap((response) => {
            console.log(
              `CacheInterceptor: Caching response for key: ${cacheKey} with TTL: ${ttl} seconds`,
            );
            return from(this.cacheService.set(cacheKey, response, ttl)).pipe(
              switchMap(() => of(response)),
            );
          }),
        );
      }),
    );
  }
}
