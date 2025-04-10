import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Pedido } from "./Pedido";

@Entity()
export class Pago {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    total!: number;

    @Column()
    dineroRecibido!: number;

    @Column()
    cambio!: number;

    @Column()
    fecha: string = new Date().toLocaleDateString("ES-ES")

    @OneToOne(() => Pedido, pedido => pedido.pago, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pedido_id" })
    pedido!: Pedido;
}
