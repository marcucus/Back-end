import { ISitesRepository } from '../interfaces/ISitesRepository';
import { getManager } from 'typeorm';
import { Site } from 'src/entities/site.entity';
import { UpdateSiteDto } from 'src/dto/sites/update-site.dto';

export class SitesRepository implements ISitesRepository {
    async findOne(id: string): Promise<Site| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM site
          WHERE id = ${id}
          LIMIT 1
        `,
      );
  
      return (response[0] as Site) || null;
    }

    async find(): Promise<Site| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM site
        `,
      );
  
      return (response as Site) || null;
    }

    async create(site: Site): Promise<Site> {
      const manager = getManager();
      await manager
        .createQueryBuilder()
        .insert()
        .into('site')
        .values(site)
        .orIgnore()
        .execute();
  
      return site;
    }

    async delete(id: string){
      const manager = getManager();
      const response = await manager
      .createQueryBuilder()
      .delete()
      .from('site')
      .where("id = :id", { id: id })
      .execute();
      return response;
    }

    async update(id: string, site : UpdateSiteDto){
      const manager = getManager();
      const response = await manager.query(
        `
          UPDATE site
          SET 
            url = '${site.url}'
          WHERE id = ${id}
          `
        );
      return response;
    }
  }