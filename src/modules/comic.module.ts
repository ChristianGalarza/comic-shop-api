import { Module } from '@nestjs/common';
import { ComicController } from 'src/controllers/comics.controller';
import { ComicService } from 'src/services/Comic.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'supabase/supabase.module';
import { PublisherService } from 'src/services/Publisher.service';
import { PublisherController } from 'src/controllers/publisher.controller';
import { PersonController } from 'src/controllers/person.controller';
import { PersonService } from 'src/services/Person.service';

@Module({
  controllers: [ComicController, PublisherController, PersonController],
  providers: [ComicService, PublisherService, PersonService],
  exports: [ComicService, PublisherService, PersonService],
  imports: [PrismaModule, SupabaseModule],
})
export class ComicModule {}
