import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import Role from "./role_model";
@Entity("user_table")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column()
  public name!: string;
  @Column()
  public password!: string;
  @Column()
  @OneToMany(() => Role, (role) => role.id) // 一对多
  public roles!: string;
  @CreateDateColumn()
  public create_time!: Date;
  @UpdateDateColumn()
  public updete_time!: Date;
}
