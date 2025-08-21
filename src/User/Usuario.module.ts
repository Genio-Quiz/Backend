import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Usuario} from "./Usuario.entity"
import { UsuarioService } from "./Usuario.service";
@Module({
    imports:[TypeOrmModule.forFeature([Usuario])],
    providers:[UsuarioService],
    controllers:[UsuarioController]
})
export class UsuarioModule {}