import { IKeywordsRepository } from '../interfaces/IKeywordsRepository';
import { getManager } from 'typeorm';
import { Keyword } from 'src/entities/keyword.entity';
import { UpdateKeywordDto } from 'src/dto/keywords/update-keyword.dto';

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
          SELECT *
          FROM "keyword"
        `,
      );
  
      return (response as Keyword) || null;
    }

    async create(keyword: Keyword): Promise<Keyword> {
      const manager = getManager();
      await manager
        .createQueryBuilder()
        .insert()
        .into('keyword')
        .values(keyword)
        .orIgnore()
        .execute();
  
      return keyword;
    }

    async update(id: string, keyword : UpdateKeywordDto){
      const manager = getManager();
      const response = await manager.createQueryBuilder()
        .update('keyword')
        .set({ keywords:keyword.keywords, position:keyword.position, lastPosition:keyword.lastPosition })
        .where("id = :id", { id: id })
        .execute();
      return response;
    }

    async delete(id: string){
      const manager = getManager();
      const response = await manager
      .createQueryBuilder()
      .delete()
      .from('keyword')
      .where("id = :id", { id: id })
      .execute();
      return response;
    }
  }