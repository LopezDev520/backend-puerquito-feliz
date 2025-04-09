import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Plato } from "./Plato";

// Entidad Categoría
@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nombre!: string;

  @OneToMany(() => Plato, plato => plato.categoria)
  platos: Plato[]

  // constructor(categoria?) {
  //   this.nombre = categoria.nombre
  // }
}