import { Injectable } from '@nestjs/common';
import { WebsiteService } from '@requester/store';
import { CreateWebsiteDto } from './dto/create-website.dto.js';
import { UpdateWebsiteDto } from './dto/update-website.dto.js';

@Injectable()
export class WebsitesService {
  constructor(private readonly websiteService: WebsiteService) {}

  list() {
    return this.websiteService.list();
  }

  find(id: number) {
    return this.websiteService.find(id);
  }

  delete(id: number) {
    return this.websiteService.delete(id);
  }

  create(website: CreateWebsiteDto) {
    return this.websiteService.create(website);
  }

  update(id: number, website: UpdateWebsiteDto) {
    return this.websiteService.update(id, website);
  }
}
