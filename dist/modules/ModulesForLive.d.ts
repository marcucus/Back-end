import { UsersModule } from "../users/users.module";
import { GoogleStrategy } from "../auth/strategies/google.strategy";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
export declare class ModulesForLive {
    getModulesConfiguration(): {
        imports: (import("@nestjs/common").DynamicModule | typeof UsersModule)[];
        controllers: (typeof AppController)[];
        providers: (typeof AppService | typeof GoogleStrategy)[];
    };
}
