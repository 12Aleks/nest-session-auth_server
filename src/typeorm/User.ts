import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Post} from "./Post";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text",
        nullable: false
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

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}