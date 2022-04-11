import { JwtStrategy } from './guards/jwt.strategy';
export declare class JwtAuthService {
    private jwtStrategy;
    constructor(jwtStrategy: JwtStrategy);
    login(user: any): {
        accessToken: {
            id: any;
            email: any;
        };
    };
}
