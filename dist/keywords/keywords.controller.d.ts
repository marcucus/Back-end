import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';
export declare class KeywordsController {
    private readonly keywordsService;
    constructor(keywordsService: KeywordsService);
    create(createKeywordDto: CreateKeywordDto): Promise<CreateKeywordDto & import("../entities/keyword.entity").Keyword>;
    findAll(): Promise<import("../entities/keyword.entity").Keyword[]>;
    findOne(id: string): Promise<import("../entities/keyword.entity").Keyword>;
    update(id: string, updateKeywordDto: UpdateKeywordDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
