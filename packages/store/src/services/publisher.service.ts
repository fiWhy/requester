import { Inject, Injectable } from '@nestjs/common';
import { Publisher } from '../../entities/publisher.entity.js';
import { Repository } from 'typeorm';
import { EntityService } from './entity-service.interfaces.js';

@Injectable()
export class PublisherService implements EntityService<Publisher> {
  constructor(
    @Inject(Publisher.name) private publisherRepository: Repository<Publisher>,
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

  update(id: number, publisher: Partial<Publisher>) {
    return this.publisherRepository.update(id, publisher);
  }
}
