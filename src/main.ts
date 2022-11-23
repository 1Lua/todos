import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger("Bootstrap")

const DEFAULT_PORT = 3000

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	const configService = app.get(ConfigService)
	const PORT = configService.get("PORT") || DEFAULT_PORT
	
	await app.listen(PORT, ()=> {
		logger.log(`Server running at ${PORT}`) 
	});

}
bootstrap();
