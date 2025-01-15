import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable() // Injeção de dependência, cria uma vez e aí só importar o que precisa
export class PostagemService{

    constructor(
        @InjectRepository(Postagem) // Vai criar instruções SQL no meu bd com base na minha classe model "Postagem"
        private postagemRepository: Repository<Postagem>,
        private temaService:TemaService
    ){}

    async findAll(): Promise<Postagem[]>{
        return this.postagemRepository.find({ // SELECT*FROM tb_postagens;
            relations:{
                tema:true
            }
        });
    }

    async findById(id:number):Promise<Postagem>{
        const postagem=await this.postagemRepository.findOne({
            where:{
                id
            },
            relations:{
                tema:true
            }
        })

        if(!postagem)
            throw new HttpException("Postagem não encontrada!", HttpStatus.NOT_FOUND)
        return postagem;
    }

    async findByTitulo(titulo:string): Promise<Postagem[]>{
        return this.postagemRepository.find({
            where:{
                titulo:ILike(`%${titulo}%`) //ILike - Insensitive Like - Vai ignorar a definição do Banco de dados sensitive ou insensitive
            },
            relations:{
                tema:true
            }
        })
    }

    async create(postagem:Postagem): Promise<Postagem>{
        await this.temaService.findById(postagem.tema.id) // Serve pra achar o tema e caso não, error 404
        return await this.postagemRepository.save(postagem); //= INSERT INTO tb_postagens(titulo, texto) VALUES (?,?)
    }

    async update(postagem:Postagem): Promise<Postagem>{
        await this.findById(postagem.id)
        await this.temaService.findById(postagem.tema.id)
        return await this.postagemRepository.save(postagem); 
        //= UPDATE tb_postagens SET titulo=postagem.titulo, 
        // texto=postagem.texto, 
        // data=CURRENT_TIMESTAMP() WHERE id=postagem.id
    }

    async delete(id:number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.postagemRepository.delete(id); //= DELETE tb_postagens WHERE id=?
    }

}

// CLASSE DE SERVIÇO: PostagemService