import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';
import { Keyword } from '../entities/keyword.entity';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private keywordsRepository: Repository<Keyword>,
  ) {}
  create(createKeywordDto: CreateKeywordDto) {
    return this.keywordsRepository.save(createKeywordDto);
  }

  findAll() {
    return this.keywordsRepository.find();
  }

  findOne(id: number) {
    return this.keywordsRepository.findOne(id);
  }

  update(id: number, updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsRepository.update(id,updateKeywordDto);
  }

  remove(id: number) {
    return this.keywordsRepository.delete(id);
  }
}
