import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongooseConfig } from './config/mongoose.config';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true}),
		MongooseModule.forRootAsync(mongooseConfig)
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
