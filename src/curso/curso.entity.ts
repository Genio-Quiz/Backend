import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Disciplina } from '../disciplina/disciplina.entity';

@Entity('curso')
export class Curso {
  @PrimaryGeneratedColumn({ name: 'idCurso' })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nome: string;

  @OneToMany(() => Disciplina, (disciplina) => disciplina.curso, {
    cascade: true,
  })
  disciplinas: Disciplina[];
}
