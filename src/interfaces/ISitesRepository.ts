import { Site } from "src/entities/site.entity";

export interface ISitesRepository {
    findOne(id: string): Promise<Site | null>;
    create(site: Site): Promise<Site>;
  }