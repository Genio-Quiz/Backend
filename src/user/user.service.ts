import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// import { CreateUserDTO } from './user.dto';

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

  async save(user: User): Promise<User> {
    const userExists = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (userExists) {
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: User): Promise<User> {
    const userExistente = await this.userRepository.findOneBy({ id });
    if (!userExistente) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userExistente, user);
    const result = await this.userRepository.save(updatedUser);
    return result;
  }
}
