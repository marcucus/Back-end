import { Keyword } from 'src/entities/keyword.entity';
import { Site } from 'src/entities/site.entity';

export class CheckKeywordDto {
    position: string;
    lastCheck: Date;
    lastPosition: string;
    date:Date;
    keywordId:Keyword;
}
