import { DeleteResult, UpdateResult } from 'typeorm';

export interface EntityService<T> {
  create(entity: Partial<T>): Promise<T>;
  list(): Promise<T[]>;
  find(id: number): Promise<T | null>;
  delete(id: number): Promise<DeleteResult>;
  update(id: number, entity: Partial<T>): Promise<UpdateResult>;
}
