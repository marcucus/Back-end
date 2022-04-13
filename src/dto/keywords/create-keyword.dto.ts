import { Site } from "../../entities/site.entity";

export class CreateKeywordDto {
    id:string;
    keywords: string;
    position: string;
    lastPosition: string;
    siteId:Site;
}
