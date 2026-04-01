import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicModule } from './modules/comic.module';

@Module({
  imports: [ConfigModule.forRoot(), ComicModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
