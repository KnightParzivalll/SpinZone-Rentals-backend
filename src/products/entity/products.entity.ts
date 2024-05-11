import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Rent } from 'src/rent/entity/rent.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: `Name of the product`,
    example: 'Bike',
  })
  @Column({ length: 50 })
  @IsString()
  name: string;

  @ApiProperty({
    description: `Short description (for example age restriction)`,
    example: '(only after 16)',
  })
  @Column({ length: 50 })
  @IsString()
  description: string;

  @ApiProperty({
    description: `Image name (file stores on server)`,
    example: 'bike.png',
  })
  @Column({})
  @IsString()
  image: string;

  @ApiProperty({
    description: `Base rent price (for 30 min)`,
    example: 150,
  })
  @Column({ unsigned: true })
  @IsNumber()
  price_30min: number;

  @ManyToMany(() => Rent, (rent) => rent.products)
  rents: Rent[];
}
