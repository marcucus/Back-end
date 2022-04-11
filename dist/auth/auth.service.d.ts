import { UsersService } from '../users/users.service';
export declare class AuthService {
    userService: UsersService;
    private oauthClient;
    private jwtService;
    private jwtStrategy;
    constructor(userService: UsersService);
    googleLogin(req: any): Promise<"No user from google" | {
        message: string;
        user: any;
    }>;
}
