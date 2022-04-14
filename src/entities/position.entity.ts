import { Keyword } from "./keyword.entity";

export class Position {
    id: string;
    lastPosition: string;
    date: Date;
    keywordId:Keyword;
}