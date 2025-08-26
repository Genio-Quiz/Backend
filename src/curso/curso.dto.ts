import { CreateDisciplinaDto } from 'src/disciplina/disciplina.dto';

export class CreateCursoDto {
  id: number;
  nome: string;
  disciplinas: CreateDisciplinaDto[];
}
