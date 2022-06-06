import { CreateKeywordDto } from './create-keyword.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateKeywordDto extends PartialType(CreateKeywordDto) {}
