import { Questao } from 'src/questao/entities/questao.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('alternativas')
export class Alternativa {
  @PrimaryGeneratedColumn({ name: 'idAlternativa' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ type: 'boolean', default: false })
  estaCorreta: boolean;

  @ManyToOne(() => Questao, (questao) => questao.alternativas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idQuestao' })
  questao: Questao;
}
