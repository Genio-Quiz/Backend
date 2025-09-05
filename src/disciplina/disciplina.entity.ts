import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Curso } from '../curso/curso.entity';
import { Questao } from 'src/questao/entities/questao.entity';
import { Questionario } from 'src/questionario/entities/questionario.entity';

@Entity('disciplina')
export class Disciplina {
  @PrimaryGeneratedColumn({ name: 'idDisciplina' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  icon: string;

  @Column({ type: 'varchar', length: 20 })
  nome: string;

  @Column({ type: 'varchar', length: 55 })
  desc: string;

  @Column({ type: 'varchar', length: 55 })
  grad: string;

  @Column({ type: 'varchar', length: 55 })
  shadow: string;

  @ManyToOne(() => Curso, (curso) => curso.disciplinas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCurso' })
  curso: Curso;

  @OneToMany(() => Questao, (questao) => questao.disciplina, { cascade: true })
  questoes: Questao[];

  @OneToMany(() => Questionario, (questionario) => questionario.disciplina, {
    cascade: true,
  })
  questionarios: Questionario[];
}
