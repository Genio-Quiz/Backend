import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UsuarioModel } from "src/User/Usuario.entity";

export default registerAs(
    "database",
    ():TypeOrmModuleOptions =>({
        type:"mysql",
        host:process.env.DB_HOST,
        port:+process.env.DB_PORT,
        username:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,

        synchronize:true,
        autoLoadEntities:true,

        entities:[UsuarioModel]
    })
)