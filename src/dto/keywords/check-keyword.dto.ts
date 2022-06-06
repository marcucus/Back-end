import { Keyword } from '../../entities/keyword.entity';

export class CheckKeywordDto {
    position: string;
    lastcheck: Date;
    lastposition: string;
    date:Date;
    search:string;
    keywordid:Keyword;
}
