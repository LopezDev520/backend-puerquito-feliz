import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Entidad Configuración de Admin
@Entity()
export class AdminConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  field!: string;

  @Column({ length: 255 })
  value!: string;
}