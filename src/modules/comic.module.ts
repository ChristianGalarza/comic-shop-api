import { Module } from '@nestjs/common';
import { ComicController } from 'src/controllers/comics.controller';
import { ComicService } from 'src/services/Comic.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'supabase/supabase.module';
import { PublisherService } from 'src/services/Publisher.service';
import { PublisherController } from 'src/controllers/publisher.controller';
import { PersonController } from 'src/controllers/person.controller';
import { PersonService } from 'src/services/Person.service';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/User.service';
import { AddressService } from 'src/services/Address.service';
import { AddressController } from 'src/controllers/address.controller';

@Module({
  controllers: [
    ComicController,
    PublisherController,
    PersonController,
    UserController,
    AddressController,
  ],
  providers: [
    ComicService,
    PublisherService,
    PersonService,
    UserService,
    AddressService,
  ],
  exports: [
    ComicService,
    PublisherService,
    PersonService,
    UserService,
    AddressService,
  ],
  imports: [PrismaModule, SupabaseModule],
})
export class ComicModule {}
