import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';
import { Keyword } from '../entities/keyword.entity';
import { KeywordsRepository } from 'src/repositories/KeywordsRepository';

@Injectable()
export class KeywordsService {
  constructor(
    private keywordsRepository: KeywordsRepository,
  ) {}
  create(createKeywordDto: CreateKeywordDto) {
    return this.keywordsRepository.create(createKeywordDto);
  }

  findAll() {
    return this.keywordsRepository.find();
  }

  findOne(id: string) {
    return this.keywordsRepository.findOne(id);
  }

  update(id: string, updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsRepository.update(id,updateKeywordDto);
  }

  remove(id: string) {
    return this.keywordsRepository.delete(id);
  }
}
