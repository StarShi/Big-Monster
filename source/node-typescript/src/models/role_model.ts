import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import User from "./user_model";
@Entity("role_table")
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column()
  public role!: string;
  @Column({
    type: "json",
    nullable: true, //字段可以为空
  })
  @ManyToMany(() => User, (user) => user.roles) // 多对多
  public users!: User[];
  @CreateDateColumn({ type: "datetime" })
  public create_time!: Date;
  @UpdateDateColumn({ type: "datetime" })
  public updete_time!: Date;
}
