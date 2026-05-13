import { Inject, Injectable } from '@nestjs/common';
import { Publisher } from '../../entities/publisher.entity.js';
import { Repository } from 'typeorm';
import { EntityService } from './entity-service.interfaces.js';
import { Website } from '../../entities/website.entity.js';

@Injectable()
export class PublisherService implements EntityService<Publisher> {
  constructor(
    @Inject(Publisher.name) private publisherRepository: Repository<Publisher>,
    @Inject(Website.name) private websiteRepository: Repository<Website>,
  ) {}

  list() {
    return this.publisherRepository.find();
  }

  find(id: number) {
    return this.publisherRepository.findOne({ where: { id } });
  }

  create(publisher: Partial<Publisher>) {
    const newPublisher = this.publisherRepository.create(publisher);
    return this.publisherRepository.save(newPublisher);
  }

  delete(id: number) {
    return this.publisherRepository.delete(id);
  }

  listWebsites(publisherId: number) {
    return this.websiteRepository.find({
      where: { publisher: { id: publisherId } },
    });
  }

  update(id: number, publisher: Partial<Publisher>) {
    return this.publisherRepository.update(id, publisher);
  }
}
