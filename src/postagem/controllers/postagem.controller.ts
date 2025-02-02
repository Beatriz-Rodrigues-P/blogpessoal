import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Postagem')
@Controller("/postagens")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostagemController{

    constructor(
        private readonly postagemService: PostagemService 
    ){} //SÓ FUNCIONA SE TIVER O INJECTABLE

    @Get()
    @HttpCode(HttpStatus.OK)
    findall(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe)id:number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get("/titulo/:titulo") //Um é o caminho e outro a variável - Pra difrenciar a consulta pelo ID e a consulta pelo Título
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param("titulo")titulo:string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()postagem:Postagem):Promise<Postagem>{
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()postagem:Postagem):Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe)id:number){
        return this.postagemService.delete(id);
    }
}

// CLASSE DE SERVIÇO: PostagemController