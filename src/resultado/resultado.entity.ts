import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Questionario } from '../questionario/questionario.entity';

@Entity('resultado')
export class Resultado {
  @PrimaryGeneratedColumn({ name: 'idResultado' })
  id: number;

  @ManyToOne(() => User, (user) => user.resultados, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idUsuario' })
  usuario: User;

  @ManyToOne(() => Questionario, (questionario) => questionario.resultados, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idQuestionario' })
  questionario: Questionario;

  @Column({ type: 'int', default: 0 })
  tempoSegundos: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataExecucao: Date;
}
