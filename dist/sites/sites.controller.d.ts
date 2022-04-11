import { SitesService } from './sites.service';
import { CreateSiteDto } from '../dto/sites/create-site.dto';
import { UpdateSiteDto } from '../dto/sites/update-site.dto';
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
    create(createSiteDto: CreateSiteDto): Promise<CreateSiteDto & import("../entities/site.entity").Site>;
    findAll(): Promise<import("../entities/site.entity").Site[]>;
    findOne(id: string): Promise<import("../entities/site.entity").Site>;
    update(id: string, updateSiteDto: UpdateSiteDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
