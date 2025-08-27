import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Disciplina } from '../disciplina/disciplina.entity';
import { Alternativa } from '../alternativa/alternativa.entity';

export enum Dificuldade {
  FACIL = 'FACIL',
  MEDIO = 'MEDIO',
  DIFICIL = 'DIFICIL',
}

@Entity('questoes')
export class Questao {
  @PrimaryGeneratedColumn({ name: 'idQuestao' })
  id: number;

  @Column({ type: 'enum', enum: Dificuldade })
  dificuldade: Dificuldade;

  @Column({ type: 'varchar', length: 255 })
  enunciado: string;

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.questoes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idDisciplina' })
  disciplina: Disciplina;

  @OneToMany(() => Alternativa, (alternativa) => alternativa.questao, {
    cascade: true,
  })
  alternativas: Alternativa[];
}
