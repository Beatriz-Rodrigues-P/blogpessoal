import{Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"}) //Create Table tb_postagens()
export class Postagem {

    @PrimaryGeneratedColumn() //INT auto_increment primary key
    @ApiProperty()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //Validação dos dados do objeto
    @Column({length:100, nullable:false}) // varchar(100) not null
    @ApiProperty()
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //Validação dos dados do objeto
    @Column({length:100, nullable:false}) // varchar(100) not null
    @ApiProperty()
    texto: string;

    @UpdateDateColumn() // Atualiza data e hora
    @ApiProperty()
    data: Date;

    @ManyToOne(()=>Tema,(tema)=>tema.postagem,{
        onDelete: "CASCADE"
    })  //(tema) 1:n (postagem)
    tema:Tema; //FOREIGN KEY

    @ManyToOne(()=>Usuario,(usuario)=>usuario.postagem,{
        onDelete: "CASCADE"
    })
    usuario:Usuario
}