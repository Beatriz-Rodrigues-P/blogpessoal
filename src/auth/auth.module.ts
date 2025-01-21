import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [forwardRef(()=> UsuarioModule), JwtModule.register({
        secret:jwtConstants.secret,
        signOptions:{expiresIn:"1h"}
    })],
    providers: [Bcrypt],
    controllers: [AuthController],
    exports: [Bcrypt, AuthService, LocalStrategy],
})
export class AuthModule {};