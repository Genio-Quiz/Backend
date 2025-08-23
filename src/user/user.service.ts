import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findByOneId(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
  findOnebyUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }
  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}

