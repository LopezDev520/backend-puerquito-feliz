import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";
import { PedidoPlato } from "./PedidoPlato";

// Entidad Plato
@Entity()
export class Plato {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  imagen!: string;

  @Column({ length: 500 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "bigint" })
  precio!: number;

  @Column({ type: "boolean" })
  activo!: boolean;

  @OneToMany(() => PedidoPlato, pedidoPlato => pedidoPlato.plato)
  pedidoPlatos!: PedidoPlato[];

  @ManyToOne(() => Categoria, categoria => categoria.platos, { nullable: false })
  categoria!: Categoria;

  // constructor(plato?) {
  //   this.nombre = plato.nombre
  //   this.precio = plato.precio
  //   this.descripcion = plato.descripcion
  //   this.activo = plato.activo || true
  //   this.categoria = plato.categoria
  // }
}