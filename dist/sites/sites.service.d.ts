import { CreateSiteDto } from '../dto/sites/create-site.dto';
import { UpdateSiteDto } from '../dto/sites/update-site.dto';
import { Site, SitesRepository } from '../entities/site.entity';
export declare class SitesService {
    private sitesRepository;
    constructor(sitesRepository: SitesRepository);
    create(createSiteDto: CreateSiteDto): Promise<CreateSiteDto & Site>;
    findAll(): Promise<Site[]>;
    findOne(id: number): Promise<Site>;
    update(id: number, updateSiteDto: UpdateSiteDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
