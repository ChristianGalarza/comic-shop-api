import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PersonDto } from 'src/dto/Person.dto';
import { PersonService } from 'src/services/Person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get()
  async findAll() {
    return await this.personService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findPersonById(id: number) {
    return await this.personService.findPersonById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create person' })
  @ApiBody({ type: PersonDto })
  async createPerson(@Body() person: PersonDto) {
    return await this.personService.createPerson(person);
  }
}
