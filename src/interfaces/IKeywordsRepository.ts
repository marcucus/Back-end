import { Keyword } from "src/entities/keyword.entity";
import { DeleteResult } from "typeorm";

export interface IKeywordsRepository {
    findOne(id: string): Promise<Keyword | null>;
    create(keyword: Keyword): Promise<Keyword>;
    delete(id: string): Promise<DeleteResult>;
    del(id:string): Promise<any>;
    infoProxy(): Promise<any>;
    resetProxy(): Promise<void>;
    resetProxyList(): Promise<void>;
    addRequest(): Promise<any>;
    checkPage(infos, url): Promise<number>;
    checkPos(id: string): Promise<void>
  }