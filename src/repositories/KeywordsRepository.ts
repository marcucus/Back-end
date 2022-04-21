import { IKeywordsRepository } from '../interfaces/IKeywordsRepository';
import { getManager, Timestamp } from 'typeorm';
import { Keyword } from 'src/entities/keyword.entity';
import { UpdateKeywordDto } from 'src/dto/keywords/update-keyword.dto';
import { CreateKeywordDto } from 'src/dto/keywords/create-keyword.dto';
import { CheckKeywordDto } from 'src/dto/keywords/check-keyword.dto';
import { timestamp } from 'rxjs';

export class KeywordsRepository implements IKeywordsRepository {
    async findOne(id: string): Promise<Keyword| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM "keyword"
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
          SELECT "keyword".id,"keyword"."keywords","position"."lastPosition","position"."date"
          FROM "position"
          INNER JOIN "keyword" ON "position"."keywordId"="keyword".id 
        `,
      );
  
      return (response as Keyword) || null;
    }
    

    async create(keyword: CreateKeywordDto): Promise<Keyword> {
      const manager = getManager();
      await manager.query(
        `
          INSERT INTO "keyword" ("position","siteId","keywords","lastCheck")
          VALUES (
            '${keyword.position}',
            '${keyword.siteId}',
            '${keyword.keywords}',
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
          INSERT INTO "position" ("lastPosition","date","keywordId")
          VALUES (
            '${keyword.lastPosition}',
            NOW()::TIMESTAMP,
            '${id}'
          );
        `,
        );
      return response;
    }

    async update(id: string, keyword : UpdateKeywordDto){
      const manager = getManager();
      const response = await manager.createQueryBuilder()
        .update('keyword')
        .set({ keywords:keyword.keywords })
        .where("id = :id", { id: id })
        .execute();
        return response;
    }

    async checkPos(id: string, keyword: CheckKeywordDto){
      const manager = getManager();
      const response = await manager.query(
        `
          UPDATE "keyword" 
          SET "lastCheck" = NOW()::TIMESTAMP, "position" = '${keyword.position}'
          WHERE id = '${id}'
        `,
        );
        this.upCreatePos(id,keyword);
      return response;
    }

    async delete(id: string){
      const manager = getManager();
      this.del(id);
      const response = await manager
      .createQueryBuilder()
      .delete()
      .from('keyword')
      .where("id = :id", { id: id })
      .execute();
      return response;
    }

    async del(id:string)
    {
      const manager = getManager();
      const response = await manager.query(
        `
        DELETE FROM "position"
        WHERE "keywordId" =  '${id}'
        `,
        );
      return response;
    }
  }