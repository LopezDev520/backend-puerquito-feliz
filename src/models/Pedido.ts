import { Column, Entity, JoinColumn, ManyToOne, OneToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { PedidoPlato } from "./PedidoPlato";
import { Pago } from "./Pago";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cliente, cliente => cliente.pedidos, { onDelete: "NO ACTION" })
  @JoinColumn({ name: "client_id" })
  cliente!: Cliente;

  @Column()
  fecha: string = new Date().toLocaleDateString("ES-ES")

  @Column({ length: 500 })
  estado!: string;

  @Column({ default: true })
  activado!: boolean;

  @OneToMany(() => PedidoPlato, pedidoPlato => pedidoPlato.pedido)
  pedidoPlatos!: PedidoPlato[];

  @OneToOne(() => Pago, pago => pago.pedido, { cascade: true })
  pago!: Pago;
}
