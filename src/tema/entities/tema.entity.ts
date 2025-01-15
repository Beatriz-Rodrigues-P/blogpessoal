import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: "tb_tema"}) // CREATE TABLE tb_tema
export class Tema {
    @PrimaryGeneratedColumn() // INT | auto_increment | Primary Key
    id:number

    @IsNotEmpty()
    @Column({length:225, nullable:false}) // varchar(225) not null
    descricao: string;

    @OneToMany(()=>Postagem,(postagem)=>postagem.tema)
    postagem:Postagem[]; // postagem:classe
}