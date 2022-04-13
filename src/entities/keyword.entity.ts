import {Site} from './site.entity';
export class Keyword {
    id: string;
    keywords: string;
    position: string;
    lastPosition: string;
    siteId: Site;
}