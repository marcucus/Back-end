import { Keyword } from 'src/entities/keyword.entity';

export class CheckKeywordDto {
    position: string;
    lastcheck: Date;
    lastposition: string;
    date:Date;
    keywordid:Keyword;
}