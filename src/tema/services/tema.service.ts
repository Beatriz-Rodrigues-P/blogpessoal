import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable() // Injeção de dependência, cria uma vez e aí só importar o que precisa
export class TemaService{
    findByTema(tema: string): Promise<Tema[]> {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Tema) // Vai criar instruções SQL no meu db com base na minha classe model "Tema"
        private temaRepository: Repository<Tema>
    ){}

    async findAll(): Promise<Tema[]>{
        return this.temaRepository.find({
            relations:{
                postagem:true
            }
         }); // SELECT*FROM tb_temas;
    }

    async findById(id:number):Promise<Tema>{
        const tema=await this.temaRepository.findOne({
            where:{
                id
            },
            relations:{
                postagem:true
            }
        })

        if(!tema)
            throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND)
        return tema;
    }

    async findByDescricao(descricao:string): Promise<Tema[]>{
        return this.temaRepository.find({
            where:{
                descricao:ILike(`%${descricao}%`) //ILike - Insensitive Like - Vai ignorar a definição do Banco de dados sensitive ou insensitive
            },
            relations:{
                postagem:true
            }
        })
    }

    async create(tema:Tema): Promise<Tema>{
        return await this.temaRepository.save(tema); //= INSERT INTO tb_tema(descricao) VALUES (?,?)
    }

    async update(tema:Tema): Promise<Tema>{
        await this.findById(tema.id)
        return await this.temaRepository.save(tema); 
        //= UPDATE tb_tema SET descricao=tema.descricao, 
        // data=CURRENT_TIMESTAMP() WHERE id=tema.id
    }

    async delete(id:number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.temaRepository.delete(id); //= DELETE tb_tema WHERE id=?
    }

}

// CLASSE DE SERVIÇO: TemaService