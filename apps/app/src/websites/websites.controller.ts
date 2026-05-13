import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Cacheable, CacheEvict } from '@requester/cache';
import { CreateWebsiteDto } from './dto/create-website.dto.js';
import { UpdateWebsiteDto } from './dto/update-website.dto.js';
import {
  WEBSITE_CACHE_KEY,
  WEBSITES_LIST_CACHE_KEY,
} from './websites.constants.js';
import { WebsitesService } from './websites.service.js';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Get()
  @Cacheable({ ttl: 60, key: WEBSITES_LIST_CACHE_KEY })
  list() {
    return this.websitesService.list();
  }

  @Get(':id')
  @Cacheable({ ttl: 60, key: WEBSITE_CACHE_KEY })
  find(@Param('id') id: number) {
    return this.websitesService.find(id);
  }

  @Post()
  @CacheEvict(WEBSITES_LIST_CACHE_KEY)
  create(@Body() website: CreateWebsiteDto) {
    return this.websitesService.create(website);
  }

  @Patch(':id')
  @CacheEvict(WEBSITES_LIST_CACHE_KEY)
  @CacheEvict(WEBSITE_CACHE_KEY)
  update(@Param('id') id: number, @Body() website: UpdateWebsiteDto) {
    return this.websitesService.update(id, website);
  }

  @Delete(':id')
  @CacheEvict(WEBSITES_LIST_CACHE_KEY)
  @CacheEvict(WEBSITE_CACHE_KEY)
  delete(@Param('id') id: number) {
    return this.websitesService.delete(id);
  }
}
