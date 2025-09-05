import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch()
  async updateUser(
    @Request() req,
    @Body() updateUserDTO: UpdateUserDto,
  ): Promise<User | null> {
    if (req.user) {
      if (updateUserDTO) {
        return this.userService.update(req.user.id, updateUserDTO);
      } else {
        throw new HttpException('Dados inválidos', HttpStatus.BAD_REQUEST);
      }
    }
    return null;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Request() req) {
    if (!req.user.id)
      return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return this.userService.delete(req.user.id);
  }
}
