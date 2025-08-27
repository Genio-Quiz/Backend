import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findByOneId(Number(id));
  }

  @HttpCode(HttpStatus.OK)
  @Get('/search/:username')
  async findByUsername(
    @Param('username') username: string,
  ): Promise<User | null> {
    return this.userService.findOnebyUsername(username);
  }
}
