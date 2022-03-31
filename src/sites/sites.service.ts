import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
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
