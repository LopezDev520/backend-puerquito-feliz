import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  token: string;

  @Column({ length: 255, nullable: true })
  nombre: string;

  @Column()
  num_mesa: number;

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos: Pedido[];
}