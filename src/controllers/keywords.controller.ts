import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { KeywordsService } from '../services/keywords.service';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Post('create')
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.create(createKeywordDto);
  }

  @Get('all')
  findAll() {
    return this.keywordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordsService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsService.update(id, updateKeywordDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.keywordsService.remove(id);
  }
}
