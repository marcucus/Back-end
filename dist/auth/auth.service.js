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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const googleapis_1 = require("googleapis");
const create_user_dto_1 = require("../dto/users/create-user.dto");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        this.oauthClient = new googleapis_1.google.auth.OAuth2(clientId, clientSecret);
    }
    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        if (req.user) {
            const newUser = new create_user_dto_1.CreateUserDto();
            newUser.firstname = req.user.firstName;
            newUser.lastname = req.user.lastName;
            newUser.email = req.user.email;
            newUser.picture = req.user.picture;
            if (!(await this.userService.isUserExists(newUser))) {
                await this.userService.create(newUser);
            }
            return {
                message: 'User Info from Google',
                user: req.user,
            };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map