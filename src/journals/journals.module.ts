import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { Journals, JournalsSchema } from './schema/journals.schema';

import { UsersModule } from '@users';

@Module({
  controllers: [JournalsController],
  imports: [
    MongooseModule.forFeature([
      { name: Journals.name, schema: JournalsSchema },
    ]),
    UsersModule,
  ],
  providers: [JournalsService],
})
export class JournalsModule {}
