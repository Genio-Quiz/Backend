  import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
  import { Curso } from '../curso/curso.entity';
  import { Questao } from '../questao/questao.entity';
	import { Questionario } from '../questionario/questionario.entity';

@Entity('disciplina')
export class Disciplina {

  @PrimaryGeneratedColumn({ name: 'idDisciplina' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  nome: string;

  @ManyToOne(() => Curso, (curso) => curso.disciplinas, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCurso' })
  curso: Curso;

  @OneToMany(() => Questao, (questao) => questao.disciplina, { cascade: true })
  questoes: Questao[];

  @OneToMany(() => Questionario, (questionario) => questionario.disciplina, { cascade: true })
  questionarios: Questionario[];
  
}