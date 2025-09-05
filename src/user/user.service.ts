import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async save(user: CreateUserDTO): Promise<Partial<User>> {
    const userExists = await this.userRepository.findOne({
      where: [{ username: user.username }, { email: user.email.toLowerCase() }],
    });
    if (userExists) {
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
    }

    const data = {
      ...user,
      email: user.email.toLowerCase(),
    };

    const newUser = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(newUser);

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
}
