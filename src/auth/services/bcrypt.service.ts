import { Injectable } from '@nestjs/common';
import { HashService } from '../interfaces/hash-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements HashService {
  private readonly saltRounds = 10;

  hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.saltRounds);
  }

  compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }
}
