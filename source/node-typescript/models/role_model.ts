import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
  ForeignKey
} from "sequelize-typescript";
import User from "./user_model";
@Table
export default class Role extends Model<Role> {
  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;
  @Column
  public role!: string;
  @CreatedAt
  public create_time!: Date;
  @UpdatedAt
  public updete_time!: Date;
}
