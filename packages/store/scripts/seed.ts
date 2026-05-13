import { faker } from '@faker-js/faker';
import { Inject, Injectable, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PublisherService } from '../src/index.js';
import { DATA_SOURCE, StoreModuleType } from '../src/store.constants.js';
import { StoreModule } from '../src/store.module.js';
import { DataSource } from 'typeorm';
import { Publisher } from '../entities/publisher.entity.js';
import { Website } from '../entities/website.entity.js';

const data = Array.from({ length: 500 }).map((_, i) => {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    contact_name: faker.person.fullName(),
    websites: Array.from({ length: 5 }).map((_, j) => {
      return {
        name: `website-${i}-${j}`,
      };
    }),
  };
});

@Injectable()
class SeedService {
  constructor(
    @Inject(DATA_SOURCE) private readonly dataSource: DataSource,
    private readonly publisherService: PublisherService,
  ) {}

  async seed() {
    await this.dataSource.manager.transaction(async (manager) => {
      for (const publisher of data) {
        this.dataSource.manager.create(Publisher, data);

        const newPublisher = manager.create(Publisher, publisher);
        const savedPublisher = await manager.save(newPublisher);

        for (const website of publisher.websites) {
          const newWebsite = manager.create(Website, {
            ...website,
            publisher: savedPublisher,
          });
          await manager.save(newWebsite);
        }
      }
    });
  }

  async clean() {
    const em = this.dataSource.createEntityManager();

    await em.clear(Publisher);
  }
}

const provider = process.env.DATABASE_PROVIDER!;
const url = process.env.DATABASE_URL!;

@Module({
  imports: [StoreModule.register({ type: provider as StoreModuleType, url })],
  providers: [SeedService],
})
class SeedModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seeder = app.get(SeedService);

  await seeder.seed();

  await app.close();
}

bootstrap();
