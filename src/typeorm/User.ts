import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text"
    })
    password: string;

    @Column({
        type: "text"
    })
    username: string;

    @Column({
        type: "text"
    })
    email: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updated_at: Date;
}