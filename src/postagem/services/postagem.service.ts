import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";

@Injectable() // Injeção de dependência, cria uma vez e aí só importar o que precisa
export class PostagemService{

    constructor(
        @InjectRepository(Postagem) // Vai criar instruções SQL no meu bd com base na minha classe model "Postagem"
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]>{
        return this.postagemRepository.find(); // SELECT*FROM tb_postagens;
    }

}

// CLASSE DE SERVIÇO: PostagemService