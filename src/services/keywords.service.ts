import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';
import { KeywordsRepository } from 'src/repositories/KeywordsRepository';

@Injectable()
export class KeywordsService {
  constructor(
    private keywordsRepository: KeywordsRepository,
  ) {}
  create(createKeywordDto: CreateKeywordDto) {
    return this.keywordsRepository.create(createKeywordDto);
  }

  keywordUser(token:string){
    return this.keywordsRepository.keywordUser(token);
  }

  findAll() {
    return this.keywordsRepository.find();
  }
  
  findAllbySite(id){
    return this.keywordsRepository.findAllbySite(id)
  }

  findOne(id: string) {
    return this.keywordsRepository.findOne(id);
  }

  update(id: string, updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsRepository.update(id,updateKeywordDto);
  }

  check(id: string) {
    return this.keywordsRepository.checkPos(id);
  }

  remove(id: string) {
    return this.keywordsRepository.delete(id);
  }
}
