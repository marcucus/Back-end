import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { development, test } from './database.json';

export const getConfig = (): TypeOrmModuleOptions => {
  if (process.env.NODE_ENV === 'test') return test as TypeOrmModuleOptions;
  return development as TypeOrmModuleOptions;
};