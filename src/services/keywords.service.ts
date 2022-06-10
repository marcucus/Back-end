import { Injectable } from '@nestjs/common';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';
import { KeywordsRepository } from '../repositories/KeywordsRepository';

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

  infoSiteByKeyword(id:string){
    return this.keywordsRepository.infoSiteByKeyword(id);
  }

  getPos(id){
    return this.keywordsRepository.getPos(id);
  }

  update(id: string, updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsRepository.update(id,updateKeywordDto);
  }

  check(id: string) {
    return this.keywordsRepository.checkPos(id);
  }

  checkAuto(){
    return this.keywordsRepository.checkAuto();
  }

  check24(id:string){
    return this.keywordsRepository.check24(id);
  }

  checkUser(token:string){
    return this.keywordsRepository.checkUser(token);
  }

  checkForceUser(token:string){
    return this.keywordsRepository.checkForceUser(token);
  }

  checkForce(id:string){
    return this.keywordsRepository.checkForce(id);
  }

  remove(id: string) {
    return this.keywordsRepository.delete(id);
  }
}
