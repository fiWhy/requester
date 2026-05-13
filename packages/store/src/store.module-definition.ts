import { ConfigurableModuleBuilder } from '@nestjs/common';
import { StoreModuleOptions } from './store-module.interface.js';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<StoreModuleOptions>({
    moduleName: 'StoreModule',
  }).build();
