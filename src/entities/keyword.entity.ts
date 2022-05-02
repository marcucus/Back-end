import {Site} from './site.entity';
export class Keyword {
    id: string;
    keywords: string;
    position: string;
    country:string;
    url:string;
    lastcheck: Date;
    siteid: Site;
}