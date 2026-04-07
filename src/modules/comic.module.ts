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
import { OrderController } from 'src/controllers/order.controller';
import { OrderService } from 'src/services/Order.service';

@Module({
  controllers: [
    ComicController,
    PublisherController,
    PersonController,
    UserController,
    AddressController,
    OrderController,
  ],
  providers: [
    ComicService,
    PublisherService,
    PersonService,
    UserService,
    AddressService,
    OrderService,
  ],
  exports: [
    ComicService,
    PublisherService,
    PersonService,
    UserService,
    AddressService,
    OrderService,
  ],
  imports: [PrismaModule, SupabaseModule],
})
export class ComicModule {}
