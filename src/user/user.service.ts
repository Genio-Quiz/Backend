import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import generateConfirmationCode from 'src/util/generateConfirmationCode';
import { SendMailDto } from 'src/mail/mail.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: [
        'id',
        'username',
        'email',
        'score',
        'isAdmin',
        'resultados',
        'createdAt',
      ],
    });
    if (!users || users.length === 0) {
      throw new HttpException(
        'Nenhum usuário encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return users;
  }

  async findByOneId(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'email',
        'score',
        'isAdmin',
        'resultados',
        'createdAt',
      ],
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOnebyUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'email',
        'score',
        'isAdmin',
        'resultados',
        'createdAt',
      ],
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserWithPassword(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async save(user: CreateUserDTO): Promise<Partial<User>> {
    const userExists = await this.userRepository.findOne({
      where: [{ username: user.username }, { email: user.email.toLowerCase() }],
    });
    if (userExists) {
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
    }

    const token = generateConfirmationCode();

    const data = {
      ...user,
      password: await bcrypt.hash(
        user.password,
        Number(process.env.SALT_ROUNDS),
      ),
      email: user.email.toLowerCase(),
      confirmationToken: token,
    };

    const newUser = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(newUser);
    if (!savedUser) {
      throw new HttpException(
        'Erro ao salvar o usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userConfirmation: SendMailDto = {
      ...savedUser,
      token: token,
    };

    await this.mailService.sendUserConfirmation(userConfirmation);

    return {
      ...savedUser,
      password: undefined,
    };
  }

  async update(id: number, user: UpdateUserDto): Promise<Partial<User>> {
    const userExistente = await this.userRepository.findOneBy({ id });
    if (!userExistente) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedUser = { ...userExistente, ...user };
    if (user.email) {
      updatedUser.email = user.email.toLowerCase();
    }
    if (user.password) {
      updatedUser.password = await bcrypt.hash(user.password, 10);
    }

    const result = await this.userRepository.save(updatedUser);
    return {
      ...result,
      password: undefined,
    };
  }

  async delete(id: number): Promise<boolean> {
    const userExistente = await this.userRepository.findOneBy({ id });
    if (!userExistente) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const userDeleted = await this.userRepository.delete(id);
    if (userDeleted.affected === 0) {
      throw new HttpException(
        'Erro ao deletar o usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }

  async confirmEmail(token: string): Promise<string> {
    const user = await this.userRepository.findOneBy({
      confirmationToken: token,
    });
    if (!user) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }

    user.confirmationToken = null;

    const userUpdated = await this.userRepository.save(user);
    if (!userUpdated) {
      throw new HttpException(
        'Erro ao confirmar o email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return 'Email confirmado com sucesso!';
  }

  async recoveryPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<string> {
    const user = await this.userRepository.findOneBy({
      recoveryToken: token,
    });
    if (!user) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }

    if (newPassword !== confirmPassword) {
      throw new HttpException(
        'As senhas não coincidem',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.recoveryToken = null;

    const userUpdated = await this.userRepository.save(user);
    if (!userUpdated) {
      throw new HttpException(
        'Erro ao recuperar a senha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return 'Senha alterada com sucesso!';
  }
}
