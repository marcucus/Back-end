import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSiteDto } from '../dto/sites/create-site.dto';
import { UpdateSiteDto } from '../dto/sites/update-site.dto';
import { Site } from '../entities/site.entity';
import { SitesRepository } from 'src/repositories/SitesRepository';
import { KeywordsService } from './keywords.service';

@Injectable()
export class SitesService {
  constructor(
    private sitesRepository: SitesRepository,
    @Inject(forwardRef(() => KeywordsService))
    private keywordsService: KeywordsService,
  ) {}

  create(createSiteDto: CreateSiteDto) {
    return this.sitesRepository.create(createSiteDto);
  }

  findAll() {
    return this.sitesRepository.find();
  }

  findOne(id: string) {
    return this.sitesRepository.findOne(id);
  }

  update(id: string, updateSiteDto: UpdateSiteDto) {
    return this.sitesRepository.update(id,updateSiteDto);
  }

  remove(id: string) {
    return this.sitesRepository.delete(id);
  }
}
