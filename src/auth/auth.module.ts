import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./services/auth.service";
import { JwtService } from "./services/jwt.service";
import { PasswordsService } from "./services/passwords.service";

@Module({
    imports: [
        forwardRef(() => UsersModule),
    ],
    providers: [
        JwtService,
        PasswordsService,
        AuthService,
        AuthGuard,
    ],
    controllers: [
        AuthController
    ],
    exports: [
        JwtService,
        PasswordsService,
        AuthGuard
    ]
})
export class AuthModule {}