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
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Request() req): Promise<User | null> {
    return this.userService.findByOneId(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findByOneId(id);
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
        await this.userService.update(req.user.id, updateUserDTO);
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

  @HttpCode(HttpStatus.OK)
  @Post('confirm')
  async confirmEmail(@Query('token') token: string): Promise<string> {
    return this.userService.confirmEmail(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('recovery')
  async recoveryPassword(
    @Query('token') token: string,
    @Body() newPassword: string,
    confirmPassword: string,
  ): Promise<string> {
    console.log(token);
    return this.userService.recoveryPassword(
      token,
      newPassword,
      confirmPassword,
    );
  }
}
