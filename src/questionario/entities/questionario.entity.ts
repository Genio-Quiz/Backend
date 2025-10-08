import { Disciplina } from 'src/disciplina/disciplina.entity';
import { Resultado } from 'src/resultado/entities/resultado.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('questionario')
export class Questionario {
  @PrimaryGeneratedColumn({ name: 'idQuestionario' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.questionarios, {
    nullable: false,
  })
  @JoinColumn({ name: 'idDisciplina' })
  disciplina: Disciplina;

  @OneToMany(() => Resultado, (resultado) => resultado.questionario)
  resultados: Resultado[];
}
