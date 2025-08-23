import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { SignInDto } from './signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const user = await this.usersService.findOnebyUsername(signInDto.username);
    if (!user) throw new HttpException('Usuário inexistente', 404);
    const match = await bcrypt.compare(signInDto.password, user?.password);
    if (!match) throw new UnauthorizedException();

    const tokenItems = {
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    return {
      token: await this.jwtService.signAsync(tokenItems, {
        secret: process.env.SECRET,
      }),
    };
  }

  async signUp(userDTO: CreateUserDTO) {
    const user = new User();
    user.username = userDTO.username;
    user.email = userDTO.email;
    user.password = await bcrypt.hash(userDTO.password, 10);
    user.score = userDTO.score;
    user.isAdmin = userDTO.isAdmin;

    const saveUser = await this.usersService.save(user);
    return saveUser;
  }
}

