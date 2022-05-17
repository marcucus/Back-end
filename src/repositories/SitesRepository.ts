import { ISitesRepository } from '../interfaces/ISitesRepository';
import { getManager } from 'typeorm';
import { Site } from 'src/entities/site.entity';
import { UpdateSiteDto } from 'src/dto/sites/update-site.dto';
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
      for(let i=0;i==req.rawHeaders.length;i++){
        var getHeaders:string = req.rawHeaders[i];
        console.log(getHeaders);
        if(getHeaders.includes('token')){
          var d = req.rawHeaders[i].slice(7); 
        }
      }
      console.log(token);
      console.log(d);
      var decoded = this.JwtService.decode(token.token);
      console.log(decoded);
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
  
      return response;
    }

    async create(site: Site, req): Promise<Site> {
      var token = req.rawHeaders[1].slice(7);
      var decoded = this.JwtService.decode(token);
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