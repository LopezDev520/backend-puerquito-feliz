import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Plato } from "./Plato";

// Entidad Categoría
@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nombre!: string;

  @ManyToMany(() => Plato, plato => plato.categorias)
  platos!: Plato[];
}