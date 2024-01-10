import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";


@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text'
    })
    title: string

    @Column({
        type: 'text'
    })
    description: string

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    create_post_At: Date

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    update_post_At: Date

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}