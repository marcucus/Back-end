import { ISitesRepository } from '../interfaces/ISitesRepository';
import { getManager } from 'typeorm';
import { Site } from '../entities/site.entity';
import { UpdateSiteDto } from '../dto/sites/update-site.dto';
import { JwtService } from '@nestjs/jwt';

export class SitesRepository implements ISitesRepository {
  private JwtService = new JwtService({
    secret: process.env.ACCESS_SECRET,
    signOptions: { expiresIn: '7d' },
  });
    async findOne(id: string): Promise<Site| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM ranking.sites
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
          FROM ranking.sites
          INNER JOIN ranking.keywords ON "sites"."id"="keywords"."siteid"
        `,
      );
  
      return (response as Site) || null;
    }

    async findAllbyUser(token,req){
      console.log(token);
      var decoded = this.JwtService.decode(token.token);
      var id = decoded.sub;
      var sites = {
        id:id
      }
      console.log(id);
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM ranking.sites
          WHERE userid = ${sites.id}
        `,
      );
      console.log(response);
      return response;
    }

    async create(site: Site, req): Promise<Site> {
      let i = 0;
      while(i<req.rawHeaders.length){
        if(req.rawHeaders[i].startsWith('Bearer')){
          var getHeaders:string = req.rawHeaders[i];
          var d = getHeaders.slice(7); 
        }
        i++
      }
      var decoded = this.JwtService.decode(d);
      var sub = decoded.sub;
      var sites = {
        url:site[0].url,
        userid:sub
      }
      const manager = getManager();
      await manager.query(
        `
        INSERT INTO ranking.sites ("url","userid")
        VALUES(
          '${sites.url}',
          ${sites.userid}
        );
        `
      )
      return site;
    }

    async delete(id: string){
        const manager = getManager();
        const infos:any = await manager.query(
          `
          SELECT "id" FROM ranking.keywords
          WHERE "siteid" =  '${id}'
          `,
          );
          for(var i=0; i < infos.length; i++){
            manager.query(
              `
              DELETE FROM ranking.positions
              WHERE "keywordid" =  '${infos[i].id}'
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
        SELECT "id" FROM ranking.keywords
        WHERE "siteid" =  '${id}'
        `,
        );
        for(var i=0; i < infos.length; i++){
          await manager.query(
            `
            DELETE FROM ranking.positions
            WHERE "keywordid" =  '${infos[i].id}'
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
        DELETE FROM ranking.keywords
        WHERE "siteid" =  '${id}'
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
      .from('ranking.sites')
      .where("id = :id", { id: id })
      .execute();
      return response;
    }

    async update(id: string, updateSiteDto:UpdateSiteDto){
      const manager = getManager();
      await manager.createQueryBuilder()
      .update('ranking.sites')
      .set({ url:updateSiteDto.url})
      .where("id = :id", { id: id })
      .execute();
    }
  }