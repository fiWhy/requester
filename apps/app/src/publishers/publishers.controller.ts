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
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import {
  PUBLISHER_CACHE_KEY,
  PUBLISHERS_LIST_CACHE_KEY,
} from './publishers.constants.js';
import { PublishersService } from './publishers.service.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  @Cacheable({ ttl: 60, key: PUBLISHERS_LIST_CACHE_KEY })
  list() {
    return this.publishersService.list();
  }

  @Post()
  @CacheEvict(PUBLISHERS_LIST_CACHE_KEY)
  create(@Body() publisher: CreatePublisherDto) {
    return this.publishersService.create(publisher);
  }

  @Get(':id')
  @Cacheable({ ttl: 60, key: PUBLISHER_CACHE_KEY })
  find(@Param('id') id: number) {
    return this.publishersService.find(id);
  }

  @Patch(':id')
  @CacheEvict(PUBLISHERS_LIST_CACHE_KEY)
  @CacheEvict(PUBLISHER_CACHE_KEY)
  update(@Param('id') id: number, @Body() publisher: UpdatePublisherDto) {
    return this.publishersService.update(id, publisher);
  }

  @Delete(':id')
  @CacheEvict(PUBLISHERS_LIST_CACHE_KEY)
  @CacheEvict(PUBLISHER_CACHE_KEY)
  delete(@Param('id') id: number) {
    return this.publishersService.delete(id);
  }
}
