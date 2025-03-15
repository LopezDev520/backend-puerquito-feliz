import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidoPlato } from "./PedidoPlato";
import { Categoria } from "./Categoria";

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
  disponible!: boolean;

  @OneToMany(() => PedidoPlato, pedidoPlato => pedidoPlato.plato)
  pedidoPlatos!: PedidoPlato[];

  @ManyToMany(() => Categoria, categoria => categoria.platos)
  @JoinTable({
    name: "categorias_platos",
    joinColumn: { name: "plato_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "categoria_id", referencedColumnName: "id" }
  })
  categorias!: Categoria[];
}