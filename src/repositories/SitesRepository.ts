import { ISitesRepository } from '../interfaces/ISitesRepository';
import { getManager } from 'typeorm';
import { Site } from 'src/entities/site.entity';
import { UpdateSiteDto } from 'src/dto/sites/update-site.dto';
import { Position } from 'src/entities/position.entity';
import { ConsoleLogger } from '@nestjs/common';

export class SitesRepository implements ISitesRepository {
    async findOne(id: string): Promise<Site| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM "site"
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
          FROM "site"
          INNER JOIN "keyword" ON "site"."id"="keyword"."siteId"
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
      /*const manager = getManager();
      const infos = await manager.query(
        `
        SELECT "id" FROM "keyword"
        WHERE "siteId" =  '${id}'
        `,
        );
        for(var i=0; i < infos.length; i++){
            manager.query(
            `
            DELETE FROM "position"
            WHERE "keywordId" =  '${infos[i].id}'
            `,
            );
        }
        await manager.query(
          `
          DELETE FROM "keyword"
          WHERE "siteId" =  '${id}'
          `,
          );
        const response = await manager
        .createQueryBuilder()
        .delete()
        .from('site')
        .where("id = :id", { id: id })
        .execute();
        return response;*/

        const manager = getManager();
        const infos:any = await manager.query(
          `
          SELECT "id" FROM "keyword"
          WHERE "siteId" =  '${id}'
          `,
          );
          for(var i=0; i < infos.length; i++){
            manager.query(
              `
              DELETE FROM "position"
              WHERE "keywordId" =  '${infos[i].id}'
              `,
              );
          }
        await this.delKeywords(id);
        await this.del(id);
    }

    
    async delPos(id: string)
    {
      const manager = getManager();
      const infos = await manager.query(
        `
        SELECT "id" FROM "keyword"
        WHERE "siteId" =  '${id}'
        `,
        );
        for(var i=0; i < infos.length; i++){
          await manager.query(
            `
            DELETE FROM "position"
            WHERE "keywordId" =  '${infos[i].id}'
            `,
            );
          
        }
      return infos;
    }

    async delKeywords(id:string)
    {
      const manager = getManager();
      const response = await manager.query(
        `
        DELETE FROM "keyword"
        WHERE "siteId" =  '${id}'
        `,
        );
      return response;
    }

    async del(id:string)
    {
      const manager = getManager();
      const response = await manager
      .createQueryBuilder()
      .delete()
      .from('site')
      .where("id = :id", { id: id })
      .execute();
      return response;
    }

    async update(id: string, updateSiteDto:UpdateSiteDto){
      const manager = getManager();
      await manager.createQueryBuilder()
      .update("site")
      .set({ url:updateSiteDto.url})
      .where("id = :id", { id: id })
      .execute();
    }
  }