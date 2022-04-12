import { EntityRepository, Repository } from 'typeorm';
import {Site} from './site.entity';
export class Keyword {
    id: number;
    keywords: string;
    position: number;
    lastPosition: number;
    siteId: number;
}