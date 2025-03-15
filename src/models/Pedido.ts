import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { PedidoPlato } from "./PedidoPlato";

// Entidad Pedido
@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cliente, cliente => cliente.pedidos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "client_id" })
  cliente!: Cliente;

  @Column({ type: "date", nullable: true })
  fecha?: Date;

  @Column({ length: 500 })
  estado!: string;

  @OneToMany(() => PedidoPlato, pedidoPlato => pedidoPlato.pedido)
  pedidoPlatos!: PedidoPlato[];
}