import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rentProduct')
export class RentProduct {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: `Name of the item`,
    example: 'Bike',
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description: `Description of the item (for example age restriction)`,
    example: '(only after 16)',
  })
  @Column({ length: 50 })
  description: string;

  @ApiProperty({
    description: `Image name (file stores on server)`,
    example: 'bike.png',
  })
  @Column({})
  image: string;

  @ApiProperty({
    description: `Rent price for 30 minutes`,
    example: 150,
  })
  @Column({ unsigned: true })
  price_30min: number;

  @ApiProperty({
    description: `Rent price for 1 hour`,
    example: 275,
  })
  @Column({ unsigned: true })
  price_1h: number;

  @ApiProperty({
    description: `Rent price for 2 hours`,
    example: 500,
  })
  @Column({ unsigned: true })
  price_2h: number;
}
