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

    const match = await bcrypt.compare(signInDto.password, user.password);
    const passwordHash = bcrypt.hashSync(
      signInDto.password,
      Number(process.env.SALT_ROUNDS),
    );
    console.log(
      'Password Hash  : ',
      passwordHash,
      ' User Password : ',
      user.password,
    );
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
    const saveUser = await this.usersService.save(userDTO);
    return saveUser;
  }

  generateRecoveryToken(userId: number): string {
    return this.jwtService.sign(
      { userId, type: 'recovery' },
      { secret: process.env.SECRET, expiresIn: '15m' },
    );
  }

  async findByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  async resetPassword(token: string, newPassword: string) {
    const payload: any = this.jwtService.verify(token, {
      secret: process.env.SECRET,
    });

    if (payload.type !== 'recovery') {
      throw new Error('Token inválido');
    }

    const user = await this.usersService.findByOneId(payload.userId);
    if (!user) throw new Error('Usuário não encontrado');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.update(user.id, { password: hashedPassword });

    return { message: 'Senha alterada com sucesso' };
  }
}
