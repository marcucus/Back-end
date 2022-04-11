"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const site_entity_1 = require("../entities/site.entity");
let SitesService = class SitesService {
    constructor(sitesRepository) {
        this.sitesRepository = sitesRepository;
    }
    create(createSiteDto) {
        return this.sitesRepository.save(createSiteDto);
    }
    findAll() {
        return this.sitesRepository.find();
    }
    findOne(id) {
        return this.sitesRepository.findOne(id);
    }
    update(id, updateSiteDto) {
        return this.sitesRepository.update(id, updateSiteDto);
    }
    remove(id) {
        return this.sitesRepository.delete(id);
    }
};
SitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __metadata("design:paramtypes", [site_entity_1.SitesRepository])
], SitesService);
exports.SitesService = SitesService;
//# sourceMappingURL=sites.service.js.map