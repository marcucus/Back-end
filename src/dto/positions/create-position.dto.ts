import { Keyword } from "src/entities/keyword.entity";

export class CreatePositionDto {
    id:string;
    lastPosition: string;
    date:Date
    keywordId:Keyword;
}