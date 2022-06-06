import { Keyword } from "../../entities/keyword.entity";

export class CreatePositionDto {
    id:string;
    lastposition: string;
    date:Date
    keywordid:Keyword;
}