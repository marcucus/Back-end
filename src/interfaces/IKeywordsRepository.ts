import { Keyword } from "src/entities/keyword.entity";

export interface IKeywordsRepository {
    findOne(id: string): Promise<Keyword | null>;
    create(keyword: Keyword): Promise<Keyword>;
  }