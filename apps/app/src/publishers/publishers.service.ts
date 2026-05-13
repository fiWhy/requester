import { Injectable } from '@nestjs/common';
import { PublisherService } from '@requester/store';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Injectable()
export class PublishersService {
  constructor(private readonly publisherService: PublisherService) {}

  list() {
    return this.publisherService.list();
  }

  find(id: number) {
    return this.publisherService.find(id);
  }

  delete(id: number) {
    return this.publisherService.delete(id);
  }

  create(publisher: CreatePublisherDto) {
    return this.publisherService.create(publisher);
  }

  update(id: number, publisher: UpdatePublisherDto) {
    return this.publisherService.update(id, publisher);
  }
}
