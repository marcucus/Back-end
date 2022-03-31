import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Sites } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Sites)
    private sitesRepository: Repository<Sites>,
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
    return this.sitesRepository.save(updateSiteDto);
  }

  remove(id: number) {
    return this.sitesRepository.delete(id);
  }
}
