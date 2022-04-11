import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { Keyword, KeywordsRepository} from '../entities/keyword.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  controllers: [KeywordsController],
  providers: [KeywordsService, KeywordsRepository],
  exports: [KeywordsService],
})
export class KeywordsModule {}
