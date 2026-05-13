import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModuleOptions } from './cache-module.interfaces.js';
import { CacheModuleType, STORE_CLIENT } from './cache.constants.js';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './cache.module-definition.js';
import { CacheService } from './cache.service.js';
import { CacheInterceptor } from './interceptors/cache.interceptor.js';
import { RedisService } from './services/redis.service.js';

@Module({
  providers: [RedisService, CacheService],
})
export class CacheModule extends ConfigurableModuleClass {
  static register(options: CacheModuleOptions) {
    const dynamic = super.register(options);
    return {
      ...dynamic,
      global: true,
      providers: [
        ...(dynamic.providers ?? []),
        {
          provide: STORE_CLIENT,
          useFactory: (options: CacheModuleOptions, r: RedisService) => {
            console.log('Initializing CacheModule with options:', options);
            // Here you can implement your caching logic, for example, using Redis or in-memory cache
            switch (options.type) {
              case CacheModuleType.Redis:
                return r;
            }
          },
          inject: [MODULE_OPTIONS_TOKEN, RedisService],
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
      ],
      exports: [STORE_CLIENT, CacheService],
    };
  }
}
