import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rent')
export class Rent {
  @ApiProperty({
    description: `id`,
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: `First name of the user`,
    example: 'James',
  })
  @Column({ length: 50 })
  first_name: string;

  @ApiProperty({
    description: `Last name of the user`,
    example: 'Roberts',
  })
  @Column({ length: 50 })
  last_name: string;

  @ApiProperty({
    description: `Reserved date for rent`,
    example: '2024-06-23',
  })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({
    description: `Reserved time for rent`,
    example: '16:12:00',
  })
  @Column({ type: 'time' })
  time: string;
}
