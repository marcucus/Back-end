import { Site } from "../../entities/site.entity";

export class CreateKeywordDto {
    id:string;
    keywords: string;
    position: string;
    country:string;
    url:string;
    lastcheck: Date;
    createdAt:Date;
    search:string;
    siteid:Site;
}