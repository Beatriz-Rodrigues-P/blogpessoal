import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tema')
@Controller("/temas")
@ApiBearerAuth()
export class TemaController{

    constructor(
        private readonly temaService: TemaService 
    ){} //SÓ FUNCIONA SE TIVER O INJECTABLE

    @Get()
    @HttpCode(HttpStatus.OK)
    findall(): Promise<Tema[]>{
        return this.temaService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe)id:number): Promise<Tema>{
        return this.temaService.findById(id);
    }

    @Get("/tema/:tema") //Um é o caminho e outro a variável - Pra difrenciar a consulta pelo ID e a consulta pelo Tema
    @HttpCode(HttpStatus.OK)
    findByTema(@Param("tema")tema:string): Promise<Tema[]>{
        return this.temaService.findByTema(tema);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()postagem:Tema):Promise<Tema>{
        return this.temaService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()tema:Tema):Promise<Tema>{
        return this.temaService.update(tema);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe)id:number){
        return this.temaService.delete(id);
    }
}

// CLASSE DE SERVIÇO: TemaController