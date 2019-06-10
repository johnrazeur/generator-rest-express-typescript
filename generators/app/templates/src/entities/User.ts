import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";
  
@Entity()
@Unique(["username"])
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Length(4, 20)
    public username: string;

    @Column()
    @Length(4, 100)
    public password: string;

    @Column({
        default: 'user'
    })
    public role: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;

    public hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}