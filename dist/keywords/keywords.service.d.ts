import { Repository } from 'typeorm';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';
import { Keyword } from '../entities/keyword.entity';
export declare class KeywordsService {
    private keywordsRepository;
    constructor(keywordsRepository: Repository<Keyword>);
    create(createKeywordDto: CreateKeywordDto): Promise<CreateKeywordDto & Keyword>;
    findAll(): Promise<Keyword[]>;
    findOne(id: number): Promise<Keyword>;
    update(id: number, updateKeywordDto: UpdateKeywordDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
