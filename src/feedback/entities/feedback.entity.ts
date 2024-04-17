import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Gender = 'male' | 'female' | 'unknown';
export const genderValues = ['male', 'female', 'unknown'];

@Entity('feedback')
export class Feedback {
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
    description: `Feedback text`,
    example: 'Some good text',
  })
  @Column({ length: 500 })
  text: string;

  @ApiProperty({
    enum: genderValues,
    default: 'unknown',
    description: `A gender of the user`,
    example: 'male',
  })
  @Column({
    type: 'enum',
    enum: genderValues,
    default: 'unknown',
  })
  gender: Gender;
}
