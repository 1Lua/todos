import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { mongooseConfig } from './config/mongoose.config';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true}),
		MongooseModule.forRootAsync(mongooseConfig),
		AuthModule,
		UsersModule,
		TodosModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
