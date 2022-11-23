import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const uri = configService.get("MONGO_URI") as string
        if(!uri) {
            throw new Error("Envoriment variable MONGO_URI is undefined")
        }
        return {
            uri
        }
    },
    inject: [ConfigService]
}