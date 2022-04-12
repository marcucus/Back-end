import { RelationOptions } from 'typeorm';
import { User } from './user.entity';

export class Site {
  id: number;
  url: string;
  userId: User;
}
