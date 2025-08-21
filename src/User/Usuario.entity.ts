import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  apelido: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'boolean' })
  administrador: boolean;

  @Column({ type: 'int' })
  pontuacao: number;

  @Column({ type: 'date' })
  criadoEm: string;
}
