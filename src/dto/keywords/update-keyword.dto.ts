import { Keyword } from 'src/entities/keyword.entity';
import { Site } from 'src/entities/site.entity';

export class UpdateKeywordDto {
    keywords: string;
    position: string;
    siteId:Site;
    lastPosition: string;
    date:Date;
    keywordId:Keyword;
}
