import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Resultado } from '../resultado/resultado.entity';

@Entity('usuarios')
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn({ name: 'idUsuario' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'apelido' })
  username: string;

  @Column({ type: 'varchar', length: 255, name: 'senha' })
  password: string;

  @Column({ type: 'boolean', default: false, name: 'admin' })
  isAdmin: boolean;

  @Column({ type: 'int', default: 0, name: 'pontuacao' })
  score: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'criadoEm',
  })
  createdAt: Date;

  @OneToMany(() => Resultado, (resultado) => resultado.usuario, {
    cascade: true,
  })
  resultados: Resultado[];
}
