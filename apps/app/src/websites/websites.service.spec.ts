import { Test, TestingModule } from '@nestjs/testing';
import { WebsitesService } from '../websites/websites.service.js';

describe('WebsitesService', () => {
  let service: WebsitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsitesService],
    }).compile();

    service = module.get<WebsitesService>(WebsitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
