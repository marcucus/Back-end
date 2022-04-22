import { Keyword } from "./keyword.entity";

export class Position {
    id: string;
    position: string;
    date: Date;
    keywordid:Keyword;
}