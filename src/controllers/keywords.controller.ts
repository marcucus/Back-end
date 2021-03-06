import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpCode } from '@nestjs/common';
import { KeywordsService } from '../services/keywords.service';
import { CreateKeywordDto } from '../dto/keywords/create-keyword.dto';
import { UpdateKeywordDto } from '../dto/keywords/update-keyword.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Cron } from '@nestjs/schedule';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Cron('0 0 */1 * * *')
  checkAuto(){
    return this.keywordsService.checkAuto();
  }

  @UseGuards(JwtAuthGuard)
  @Post('check24/:id')
  @HttpCode(200)
  check24(@Param('id') id: string){
    return this.keywordsService.check24(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkUser/:token')
  @HttpCode(200)
  checkUser(@Param('token') token:string){
    return this.keywordsService.checkUser(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkForceUser/:token')
  @HttpCode(200)
  checkForceUser(@Param('token') token:string){
    return this.keywordsService.checkForceUser(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkForce/:id')
  @HttpCode(200)
  checkForce(@Param('id') id:string){
    return this.keywordsService.checkForce(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(200)
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.create(createKeywordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @HttpCode(200)
  findAll() {
    return this.keywordsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.keywordsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('allbysite/:id')
  @HttpCode(200)
  findAllbySite(@Param('id') id: string) {
    return this.keywordsService.findAllbySite(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getPos/:id')
  @HttpCode(200)
  getPos(@Param('id') id: string) {
    return this.keywordsService.getPos(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('keyworduser/:token')
  @HttpCode(200)
  keywordUser(@Param('token') token: string) {
    return this.keywordsService.keywordUser(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('keywordsite/:id')
  @HttpCode(200)
  infoSiteByKeyword(@Param('id') id: string) {
    return this.keywordsService.infoSiteByKeyword(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsService.update(id, updateKeywordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('check/:id')
  @HttpCode(200)
  check(@Param('id') id: string) {
    return this.keywordsService.check(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.keywordsService.remove(id);
  }
}
