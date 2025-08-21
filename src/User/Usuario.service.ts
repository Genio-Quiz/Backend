import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./Usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private UsuarioRepository:Repository<Usuario>
    ){}

    findAll():Promise<Usuario[]>{
        return this.UsuarioRepository.find()
    }
    findById(idUsuario:number):Promise<Usuario|null>{
        return this.UsuarioRepository.findOneBy({idUsuario})
    }
}