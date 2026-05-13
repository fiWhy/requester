import { Inject, Injectable } from '@nestjs/common';
import { Website } from '../../entities/website.entity.js';
import { Repository } from 'typeorm';
import { EntityService } from './entity-service.interfaces.js';

@Injectable()
export class WebsiteService implements EntityService<Website> {
  constructor(
    @Inject(Website.name) private websiteRepository: Repository<Website>,
  ) {}

  list() {
    return this.websiteRepository.find();
  }

  find(id: number): Promise<Website | null> {
    return this.websiteRepository.findOne({ where: { id } });
  }

  create(
    website: Partial<Website> & {
      publisherId: number;
    },
  ) {
    const newWebsite = this.websiteRepository.create(website);
    return this.websiteRepository.save(newWebsite);
  }

  delete(id: number) {
    return this.websiteRepository.delete(id);
  }

  update(id: number, website: Partial<Website>) {
    return this.websiteRepository.update(id, website);
  }
}
