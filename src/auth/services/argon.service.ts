import { Injectable } from '@nestjs/common';
import { HashService } from '../interfaces/hash-service.interface';

@Injectable()
export class ArgonService implements HashService {
  hash(plainText: string): Promise<string> {
    return Promise.resolve('hashedString');
  }

  compare(plainText: string, hashed: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
