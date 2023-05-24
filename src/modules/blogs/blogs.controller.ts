import { Controller, Get, Param } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private service: BlogsService) { }
  @Get("/by-username/:username")
  async getByUsername(@Param('username') username: string) {
    const { id } = await this.service.getByUsernameOrFail(username)
    return { username, id };
  }

  @Get('/by-id/:id')
  async getById(@Param('id') id: string) {
    const { username } = await this.service.getByIdOrFail(id)
    return { id, username };
  }

}
