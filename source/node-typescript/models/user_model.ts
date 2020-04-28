import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import Role from "./role_model";
@Table
export default class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;
  @Column
  public name!: string;
  @Column
  public password!: string;
  @Column
  @HasMany(() => Role)
  public roleId!: Role[];
  @CreatedAt
  public create_time!: Date;
  @UpdatedAt
  public updete_time!: Date;
}
