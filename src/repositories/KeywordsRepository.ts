import { IKeywordsRepository } from '../interfaces/IKeywordsRepository';
import { getManager, Timestamp } from 'typeorm';
import { Keyword } from 'src/entities/keyword.entity';
import { UpdateKeywordDto } from 'src/dto/keywords/update-keyword.dto';
import { CreateKeywordDto } from 'src/dto/keywords/create-keyword.dto';
import { CheckKeywordDto } from 'src/dto/keywords/check-keyword.dto';
import { HttpService } from '@nestjs/common';

export class KeywordsRepository implements IKeywordsRepository {
  private http: HttpService;
    async findOne(id: string): Promise<Keyword| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM ranking.keywords
          WHERE id = $1
          LIMIT 1
        `,
        [id],
      );
  
      return (response[0] as Keyword) || null;
    }

    async find(): Promise<Keyword| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT ranking.keywords.id,ranking.keywords.keywords,ranking.positions.lastposition,ranking.positions.date
          FROM ranking.positions
          INNER JOIN ranking.keywords ON ranking.positions.keywordid=ranking.keywords.id 
        `,
      );
  
      return (response as Keyword) || null;
    }

    async create(keyword: CreateKeywordDto): Promise<Keyword> {
      const manager = getManager();
      const relatedKeyword = keyword.keywords.replace(/\s/g,"+")
      await manager.query(
        `
          INSERT INTO ranking.keywords ("position","keywords","siteid","lastcheck")
          VALUES (
            '${keyword.position}',
            '${relatedKeyword}',
            '${keyword.siteid}',
            NOW()::TIMESTAMP
          );
        `
      );
      return keyword;
    }

    async upCreatePos(id:string, keyword : CheckKeywordDto)
    {
      const manager = getManager();
      const response = await manager.query(
        `
          INSERT INTO ranking.positions ("lastposition","keywordid","date")
          VALUES (
            '${keyword.lastposition}',
            '${id}',
            NOW()::TIMESTAMP
          );
        `
        );
      return response;
    }

    async update(id: string, keyword : UpdateKeywordDto){
      const manager = getManager();
      const relatedKeyword = keyword.keywords.replace(/\s/g,"+")
      const response = await manager.createQueryBuilder()
        .update('ranking.keywords')
        .set({ keywords:relatedKeyword })
        .where("id = :id", { id: id })
        .execute();
        return response;
    }

    async checkPos(id: string, keyword: CheckKeywordDto){
      const manager = getManager();
      const response = await manager.query(
        `
          UPDATE ranking.keywords 
          SET lastcheck = NOW()::TIMESTAMP, position = '${keyword.position}'
          WHERE id = '${id}'
        `
        );
        const infos = await manager.query(
          `
            SELECT ranking.keywords.keywords, ranking.sites.url
            FROM ranking.keywords
            INNER JOIN ranking.sites ON ranking.keywords.siteid = ranking.sites.id 
            WHERE ranking.keywords.id = '${id}'
          `
          );
        console.log(infos);
        this.http.get<any>(`https://www.whole-search.com/Google/fr-fr/index.asp?keyword=${infos.keywords}&domain=${infos.url}`).subscribe((response) => {
          console.log(response);
        });
        this.upCreatePos(id,keyword);
        this.addRequest();
      return response;
    }

    async addRequest(){
      const manager = getManager();
      const nbRequest = await manager.query(
        `
          SELECT number
          FROM ranking.request
        `
      );
      if(nbRequest.number<=199){
      const response = await manager.query(
        `
          UPDATE ranking.request
          SET number = number+1
        `
        );
        return response;
      }
      else {
        this.resetProxy();
        const response = await manager.query(
          `
            UPDATE ranking.request
            SET number = 0
          `
          );
          return response;
      }

    }

    async resetProxy(){

    }

    async delete(id: string){
      const manager = getManager();
      this.del(id);
      const response = await manager
      .createQueryBuilder()
      .delete()
      .from('ranking.keywords')
      .where("id = :id", { id: id })
      .execute();
      return response;
    }

    async del(id:string)
    {
      const manager = getManager();
      const response = await manager.query(
        `
        DELETE FROM ranking.positions
        WHERE "keywordid" =  '${id}'
        `,
        );
      return response;
    }
  }