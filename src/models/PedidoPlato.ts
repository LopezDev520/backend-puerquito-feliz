import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";
import { Plato } from "./Plato";

@Entity()
export class PedidoPlato {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Pedido, pedido => pedido.pedidoPlatos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pedido_id" })
  pedido!: Pedido;

  @ManyToOne(() => Plato, plato => plato.pedidoPlatos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "plato_id" })
  plato!: Plato;

  @Column({ type: "varchar" })
  anotacion!: string

  @Column({ type: "bigint" })
  cantidad!: number;

  @Column()
  subtotal!: number
}
