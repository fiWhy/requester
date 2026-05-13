import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  constructor() {}
  getHello(): string {
    return 'Hello World!';
  }
}
