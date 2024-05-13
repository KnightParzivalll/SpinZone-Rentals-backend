import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNumber } from 'class-validator';
import { Product } from 'src/products/entity/products.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Duration {
  _30min = '30min',
  _1h = '1h',
  _2h = '2h',
}

export const durationValues: Duration[] = Object.values(Duration);

@Entity('rent')
export class Rent {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: `Reserved date for rent`,
  })
  @Column({ type: 'datetime' })
  @IsDateString()
  date: Date;

  @ApiProperty({
    enum: durationValues,
    description: `Duration`,
    example: '30min',
  })
  @Column({
    type: 'enum',
    enum: durationValues,
  })
  @IsIn(durationValues)
  duration: Duration;

  @ApiProperty({
    description: `Total price`,
    example: 1000,
  })
  @Column({ unsigned: true })
  total_price: number;

  @ManyToMany(() => Product, (product) => product.rents, {
    nullable: false,
  })
  @JoinTable()
  products: Product[];

  @ManyToOne(() => User, (user) => user.rents, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
