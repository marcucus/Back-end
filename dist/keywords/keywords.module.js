"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordsModule = void 0;
const common_1 = require("@nestjs/common");
const keywords_service_1 = require("./keywords.service");
const keywords_controller_1 = require("./keywords.controller");
const keyword_entity_1 = require("../entities/keyword.entity");
const typeorm_1 = require("@nestjs/typeorm");
let KeywordsModule = class KeywordsModule {
};
KeywordsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([keyword_entity_1.Keyword])],
        controllers: [keywords_controller_1.KeywordsController],
        providers: [keywords_service_1.KeywordsService, keyword_entity_1.KeywordsRepository],
        exports: [keywords_service_1.KeywordsService],
    })
], KeywordsModule);
exports.KeywordsModule = KeywordsModule;
//# sourceMappingURL=keywords.module.js.map