import{Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

@Entity({name: "tb_postagens"}) //Create Table tb_postagens()
export class Postagem {

    @PrimaryGeneratedColumn() //INT auto_increment primary key
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //Validação dos dados do objeto
    @Column({length:100, nullable:false}) // varchar(100) not null
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //Validação dos dados do objeto
    @Column({length:100, nullable:false}) // varchar(100) not null
    texto: string;

    @UpdateDateColumn() // Atualiza data e hora
    data: Date;

    

}