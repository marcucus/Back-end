import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SitesService } from '../services/sites.service';
import { CreateSiteDto } from '../dto/sites/create-site.dto';
import { UpdateSiteDto } from '../dto/sites/update-site.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}
  jwtService:JwtService;
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createSiteDto: CreateSiteDto, @Req() req) {
    return this.sitesService.create(createSiteDto,req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.sitesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('allbyuser')
  findAllByUser(@Body() token,@Req() req) {
    return this.sitesService.findAllByUser(token,req);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.sitesService.update(id, updateSiteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.sitesService.remove(id);
  }
}
