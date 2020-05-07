import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  BaseEntity,
  JoinTable
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
  @Column({
    type:"json",
    nullable: true, //可以为空
  })
  @ManyToMany(() => Role, (role) => role.users) // 多对多
  @JoinTable()
  public roles!: Role[];
  @Column({
    default: true, // 给预设值
  })
  public is_active!: boolean;
  @CreateDateColumn()
  public create_time!: Date;
  @UpdateDateColumn()
  public updete_time!: Date;
}
