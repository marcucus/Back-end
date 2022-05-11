import { UpdateSiteDto } from "src/dto/sites/update-site.dto";
import { Site } from "src/entities/site.entity";
import { DeleteResult } from "typeorm";

export interface ISitesRepository {
    findOne(id: string): Promise<Site | null>;
    find(): Promise<Site| null>;
    create(site: Site, req): Promise<Site>;
    update(id: string, updateSiteDto:UpdateSiteDto): Promise<void>;
    delete(id: string): Promise<void>;
    delPos(id: string): Promise<any>;
    delKeywords(id:string): Promise<any>;
    del(id:string): Promise<DeleteResult>;
  }