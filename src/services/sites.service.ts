import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from '../dto/sites/create-site.dto';
import { UpdateSiteDto } from '../dto/sites/update-site.dto';
import { SitesRepository } from 'src/repositories/SitesRepository';

@Injectable()
export class SitesService {
  constructor(
    private sitesRepository: SitesRepository,
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
