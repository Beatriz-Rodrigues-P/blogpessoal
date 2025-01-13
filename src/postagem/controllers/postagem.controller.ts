import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens")
export class PostagemController{

    constructor(
        private readonly postagemService: PostagemService 
    ){} //SÓ FUNCIONA SE TIVER O INJECTABLE

    @Get()
    @HttpCode(HttpStatus.OK)
    findall(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
}

// CLASSE DE SERVIÇO: PostagemController