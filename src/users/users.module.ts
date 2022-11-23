import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        forwardRef(() => AuthModule)
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}