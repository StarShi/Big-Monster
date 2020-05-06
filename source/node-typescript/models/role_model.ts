import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import User from "./user_model";
@Entity("role_table")
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column()
  public role!: string;
  @ManyToOne(() => User, user => user.id) // 多对一
  public users!: string;
  @CreateDateColumn()
  public create_time!: Date;
  @UpdateDateColumn()
  public updete_time!: Date;
}
