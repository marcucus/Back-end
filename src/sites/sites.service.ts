import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from '../dto/sites/create-site.dto';
import { UpdateSiteDto } from '../dto/sites/update-site.dto';
import { Site, SitesRepository } from '../entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: SitesRepository,
  ) {}

  create(createSiteDto: CreateSiteDto) {
    return this.sitesRepository.save(createSiteDto);
  }

  findAll() {
    return this.sitesRepository.find();
  }

  findOne(id: number) {
    return this.sitesRepository.findOne(id);
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return this.sitesRepository.update(id,updateSiteDto);
  }

  remove(id: number) {
    return this.sitesRepository.delete(id);
  }
}
