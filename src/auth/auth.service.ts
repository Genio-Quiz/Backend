import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './signIn.dto';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const user = await this.usersService.findUserWithPassword(
      signInDto.username,
    );
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
    const createUserDTO = new CreateUserDTO();
    createUserDTO.username = userDTO.username;
    createUserDTO.email = userDTO.email;
    createUserDTO.password = await bcrypt.hash(userDTO.password, 10);
    createUserDTO.score = userDTO.score;
    createUserDTO.isAdmin = userDTO.isAdmin;

    const saveUser = await this.usersService.save(createUserDTO);
    return saveUser;
  }
}
