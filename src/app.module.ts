import { Module } from '@nestjs/common';
import { ModulesForLive } from './modules/ModulesForLive';

const buildModules = new ModulesForLive();

@Module(buildModules.getModulesConfiguration())

export class AppModule {}
